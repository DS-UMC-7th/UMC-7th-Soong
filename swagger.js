import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "UMC 7th Node.js 프로젝트",
    version: "1.0.0",
    description: "Swagger API 문서",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "개발 서버",
    },
  ],
  components: {
    schemas: {
      CreateStoreDTO: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "스타벅스",
          },
          location: {
            type: "string",
            example: "서울 강남구",
          },
          description: {
            type: "string",
            example: "커피 전문점",
          },
        },
      },
      CreateReviewDTO: {
        type: "object",
        properties: {
          rating: {
            type: "number",
            example: 5,
          },
          comment: {
            type: "string",
            example: "좋아요!",
          },
          userId: {
            type: "string",
            example: "user123",
          },
        },
      },
      CreateMissionDTO: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "첫 방문 인증",
          },
          description: {
            type: "string",
            example: "스타벅스에서 인증샷 올리기",
          },
          reward: {
            type: "number",
            example: 100,
          },
        },
      },
    },
  },
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ["./index.js"], // Swagger 주석이 있는 파일 경로
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
