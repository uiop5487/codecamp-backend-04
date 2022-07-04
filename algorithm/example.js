// 100층 계단 오르기
function solution() {
  let answer = 0;
  for (let i = 1; i <= 100; i = i + 2) {
    answer++;
  }
  return answer;
}

solution();
