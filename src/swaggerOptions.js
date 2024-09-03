import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Node.js API with Express and Swagger',
    },
    // servers: [
    //   {
    //     url: 'http://localhost:3095', // API 서버 주소
    //   },
    // ],
  },
  apis: ['./src/routers/*.js'], // API 문서가 작성된 파일 경로
};

export const swaggerSpec = swaggerJsdoc(options);