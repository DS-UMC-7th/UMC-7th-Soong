import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import NaverStrategy from "passport-naver"; 
import { prisma } from "./db.config.js";

dotenv.config();


export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateUser(profile);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);


export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
    profileFields: ['email', 'displayName'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateUser(profile); 
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);


const findOrCreateUser = async (profile) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error(`Profile email not found: ${JSON.stringify(profile)}`);
  }


  let user = await prisma.user.findFirst({ where: { email } });

  
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: "추후 수정",
        birthdate: new Date(1970, 0, 1),
        address: "추후 수정",
        spec_address: "추후 수정",
        phonenumber: "추후 수정",
      },
    });
  }

  return { id: user.id, email: user.email, name: user.name };
};
