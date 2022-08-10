/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 *
 *
 */

const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.fourthUpload = async (event, context) => {
  const fileName = event.name; // 파일 이름
  const contentType = event.contentType; // 콘텐츠 타입 확인

  // 이미지가 아닐 경우 리턴
  if (!contentType.startsWith("image/")) {
    console.log("이미지가 아닙니다");
    return;
  }

  // 한 번 실행 되고 나서 다시 실행되는 것을 방지
  if (fileName.startsWith("thumb/")) {
    console.log("한 번 돌았습니다.");
    return;
  }

  const storage = new Storage().bucket(event.bucket);

  // 사이즈와 폴더이름을 가진 배열 생성
  const arr = [
    { size: 360, folder: "thumb/s" },
    { size: 640, folder: "thumb/m" },
    { size: 1280, folder: "thumb/l" },
  ];

  // 한 번에 만들기 위해 프로미스 올 사용
  await Promise.all(
    arr.map((el) => {
      return new Promise((resolve, reject) => {
        storage
          .file(event.name)
          .createReadStream() // 기존에 있던 파일 가져오기
          .pipe(sharp().resize({ width: el.size })) // 가져온 파일 사이즈 조절 후 생성
          .pipe(storage.file(`${el.folder}/${event.name}`).createWriteStream()) // 생성 된 파일 다시 업로드
          .on("finish", () => resolve())
          .on("error", () => reject());
      });
    })
  );
};
