import express from "express";
import morgan from "morgan";
import router from "./routers/index.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerOptions.js";
import { ENV_KEY } from "./constants/env.constant.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api", async (req, res) => {
  res.status(200).json({ message: "테스트 성공" });
});

app.listen(process.env.PORT, async () => {
  console.log(ENV_KEY.PORT, "포트로 서버가 열렸습니다!");
});
