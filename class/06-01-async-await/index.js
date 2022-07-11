import axios from "axios";

// 1. 비동기방식
const fetchPost = () => {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기 방식: ", result);
};

fetchPost();

// 2. 동기방식
const fetchPost2 = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기 방식: ", result.data);
};

fetchPost2();
