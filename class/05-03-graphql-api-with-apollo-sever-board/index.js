import { ApolloServer, gql } from "apollo-server";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn => 객체 1개를 의미ㄴ
    fetchBoards: [MyReturn] # => 배열 안에 객체 여러개를 의미
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(phone: String!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. 데이터 조회 => DB에서 데이터 꺼내오기
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "1번 제목입니다.",
          contents: "1번 내용입니다.",
        },
        {
          number: 2,
          writer: "영희",
          title: "2번 제목입니다.",
          contents: "2번 내용입니다.",
        },
        {
          number: 3,
          writer: "훈이",
          title: "3번 제목입니다.",
          contents: "3번 내용입니다.",
        },
      ];

      // 2. 꺼내온 결과 응답 주기
      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);
      // 1. 데이터를 등록 => DB에 접속해 데이터 저장

      // 2. 저장 결과 응답 주기
      return "등록에 성곡하였습니다.";
    },

    createTokenOfPhone: (_, args) => {
      const phone = args.phone;
      const isValid = checkValidationPhone(phone);
      if (!isValid) {
        res.send("휴대폰 번호를 제대로 입력해주세요");
        return;
      }

      // 2. 핸드폰 토큰 6자리 만들기
      const token = getToken();

      // 3. 핸드폰번호에 토큰 전송
      sendTokenToSMS(phone, token);
      return "인증완료";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});

server.listen(3000).then(({}) => {
  console.log("프로그램 실행~");
});
