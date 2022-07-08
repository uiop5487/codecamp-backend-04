import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    aaa: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    aaa: () => {
      console.log("데이터 요청");
      return "데이터 요청~";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({}) => {
  console.log("프로그램 실행~");
});
