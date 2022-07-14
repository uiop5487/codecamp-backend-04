import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
});

// 컬렉션 만들기
export const Board = mongoose.model("Board", BoardSchema);
