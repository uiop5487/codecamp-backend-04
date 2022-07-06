const getDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = JSON.stringify(date.getMonth() + 1).padStart(2, "0");
  const dd = JSON.stringify(date.getDate()).padStart(2, "0");
  const tt = JSON.stringify(date.getHours()).padStart(2, "0");
  const m = JSON.stringify(date.getMinutes()).padStart(2, "0");
  const s = JSON.stringify(date.getSeconds()).padStart(2, "0");
  console.log(`오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${tt}:${m}:${s}입니다.`);
};

getDate();
