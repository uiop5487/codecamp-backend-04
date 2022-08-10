/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 *
 *
 */

const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

exports.secondUpload = async (event, context) => {
  if (event.name.includes('thumb/')) return;

  const storage = new Storage().bucket(event.bucket);
  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 기존에 있던 파일 가져오기
      .pipe(sharp().resize({ width: 320 })) // 가져온 파일 사이즈 조절 후 생성
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 생성 된 파일 다시 업로드
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));
  });
};
