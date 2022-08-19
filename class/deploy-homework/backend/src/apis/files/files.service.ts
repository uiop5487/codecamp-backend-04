import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    // 파일을 클라우드 스토리지에 저장
    console.log(files);

    // const aaa = await files[0];
    // const bbb = await files[1];

    const waitedFiles = await Promise.all(files);

    const bucket = 'codecamp-backend-storage';

    const storage = new Storage({
      projectId: 'norse-avatar-358105',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-backend-storage');

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(waitedFiles[0].filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    return results;
  }
}
