import axios from "axios";
import cheerio from "cheerio";

const createMessage = async () => {
  // 1. 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기

  // 2. 해당 문장을 요청해서 html 코드 받아오기 => 스크래핑
  const result = await axios.get("http://www.naver.com");

  // 2. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내 변수에 저장
  const $ = cheerio.load(result.data);
  $("meta").each((_, el) => {
    if ($(el).attr("property")?.includes("og:")) {
      const key = $(el).attr("property");
      const value = $(el).attr("content");
      console.log(key, value);
    }
  });
};

createMessage();
