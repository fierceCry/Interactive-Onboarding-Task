import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get('/api', async (req, res) => {
  res.status(200).json({ message: '테스트 성공'});
})

app.listen(process.env.PORT, async()=>{
  console.log(process.env.PORT, '포트로 서버가 열렸습니다!');
});
