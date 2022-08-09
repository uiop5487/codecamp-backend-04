const fetchPromise = async () => {
  console.time("=== 개별 프로미스 각각 ===");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 1000);
  });
  console.timeEnd("=== 개별 프로미스 각각 ===");
};

const fetchPromiseAll = async () => {
  console.time("=== 프로미스 올 ===");
  const result = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 2000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 3000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 1000);
    }),
  ]);
  console.log(result);
  console.timeEnd("=== 프로미스 올 ===");
};

fetchPromise();
fetchPromiseAll();
