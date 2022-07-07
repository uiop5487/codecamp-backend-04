import express from "express";

const app = express();

// app.get(endpoint, fn)
app.get("/aaa", (req, res) => {
  res.send("데이터 요청~");
});

// app.post("qqq", (req, res) => {});

app.listen(3000, () => {
  console.log(`프로그램 실행~`);
});
