
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { handleUserSignUp,  handleUpdateUser } from './controllers/user.controller.js';
import { addStore, handleListStoreReviews } from "./controllers/store.controller.js";
import { addReview } from "./controllers/review.controller.js";
import { addMission, challengeMission } from "./controllers/mission.controller.js";
import passport from "passport";
import { googleStrategy, naverStrategy } from "./auth.config.js"; // NaverStrategy 추가

dotenv.config();

passport.use(googleStrategy);
passport.use(naverStrategy); 
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT || 3001; 

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, 
      dbRecordIdIsSessionId: true,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/naver", passport.authenticate("naver"));

app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/") 
);


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: "사용자 회원가입"
 *     description: "새로운 사용자를 생성합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 example: "홍길동"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               phoneNumber:
 *                 type: string
 *                 example: "010-1234-5678"
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["sports", "music"]
 *     responses:
 *       200:
 *         description: "회원가입 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User signed up"
 *                 data:
 *                   type: object
 *       500:
 *         description: "서버 에러"
 */
app.post("/auth/signup", handleUserSignUp);

app.put("/api/users/:userId/update", handleUpdateUser);

/**
 * @swagger
 * /store:
 *   post:
 *     summary: "새로운 가게 등록"
 *     description: "새로운 가게를 등록합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateStoreDTO"
 *     responses:
 *       201:
 *         description: "가게 등록 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Store created"
 *                 data:
 *                   $ref: "#/components/schemas/CreateStoreDTO"
 *       500:
 *         description: "서버 에러"
 */
app.post("/store", addStore);

/**
 * @swagger
 * /api/v1/stores/{storeId}/reviews:
 *   get:
 *     summary: "가게 리뷰 조회"
 *     description: "특정 가게의 리뷰 목록을 조회합니다."
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: "리뷰를 조회할 가게 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "리뷰 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Reviews fetched"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: "가게를 찾을 수 없음"
 *       500:
 *         description: "서버 에러"
 */
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

/**
 * @swagger
 * /store/{storeId}/review:
 *   post:
 *     summary: "가게 리뷰 추가"
 *     description: "특정 가게에 대한 리뷰를 추가합니다."
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: "리뷰를 추가할 가게 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateReviewDTO"
 *     responses:
 *       201:
 *         description: "리뷰 추가 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Review added"
 *                 data:
 *                   $ref: "#/components/schemas/CreateReviewDTO"
 *       404:
 *         description: "가게를 찾을 수 없음"
 *       500:
 *         description: "서버 에러"
 */
app.post("/store/:storeId/review", addReview);

/**
 * @swagger
 * /store/{storeId}/mission:
 *   post:
 *     summary: "가게에 미션 추가"
 *     description: "특정 가게에 대한 미션을 추가합니다."
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: "미션을 추가할 가게 ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateMissionDTO"
 *     responses:
 *       201:
 *         description: "미션 추가 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Mission added"
 *                 data:
 *                   $ref: "#/components/schemas/CreateMissionDTO"
 *       404:
 *         description: "가게를 찾을 수 없음"
 *       500:
 *         description: "서버 에러"
 */
app.post("/store/:storeId/mission", addMission);

/**
 * @swagger
 * /store/{storeId}/mission/{missionId}/challenge:
 *   post:
 *     summary: "가게의 미션 도전"
 *     description: "특정 미션에 도전합니다."
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: "미션을 포함하는 가게 ID"
 *         schema:
 *           type: string
 *       - in: path
 *         name: missionId
 *         required: true
 *         description: "도전할 미션 ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "미션 도전 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Mission successfully challenged"
 *       400:
 *         description: "이미 도전한 미션"
 *       404:
 *         description: "가게 또는 미션을 찾을 수 없음"
 *       500:
 *         description: "서버 에러"
 */
app.post("/store/:storeId/mission/:missionId/challenge", challengeMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
