// 1-1 타입 지정하기
const myname: string = "철수";
const breadCount: number = 2;
const isActive: boolean = false;

// 1-2 배열형 타입 지정하기
const classmates: string[] = ["철수", "영희", "훈이"];
const candyCounts: number[] = [2, 6, 4];
const moneyList: number[] | string[] = [1000, 2500, 4300] || [
  "1000원",
  "2500원",
  "4300원",
];
const isActiveList: (string | boolean)[] = [
  true,
  false,
  "false",
  "true",
  false,
];

// 1-3 객체형 타입 지정하기
interface ICreateBoard {
  writer: string;
  title: string;
  contents: string;
}

const createBoardInput: ICreateBoard = {
  writer: "영희",
  title: "좋은 날씨 입니다~",
  contents: "오늘은 특히 더 날씨가 좋네요^^",
};

interface IUpdateBoard {
  writer: string;
  title?: string;
  contents: string;
}

const updateBoardInput1: IUpdateBoard = {
  writer: "영희",
  title: "좋은 날씨 입니다~",
  contents: "오늘은 특히 더 날씨가 좋네요^^",
};

const updateBoardInput2: IUpdateBoard = {
  writer: "훈이",
  contents: "기존에 작성한 글 내용 일부가 수정됐네요",
};
