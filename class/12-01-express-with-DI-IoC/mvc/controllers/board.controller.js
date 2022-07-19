export class BoardController {
  createBoard = (req, res) => {
    res.send("게시물이 등록 되었습니다.");
  };

  fetchBoards = (req, res) => {
    res.send("게시물 목록 조회");
  };
}
