import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { addStore } from "./controllers/store.controller.js";
import { addReview } from "./controllers/review.controller.js";
import { addMission, challengeMission } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // 포트 기본값 설정

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/signup", handleUserSignUp);

// 가게 추가 API
app.post("/store", addStore);

// 가게에 리뷰 추가 API
app.post("/store/:storeId/review", addReview);

// 가게에 미션 추가 API
app.post("/store/:storeId/mission", addMission);

// 가게의 미션 도전 API
app.post("/store/:storeId/mission/:missionId/challenge", challengeMission);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});