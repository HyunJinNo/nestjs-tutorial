import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

// multerOption 객체 선언
export const multerOptions = {
  // 디스크 스토리지 사용
  storage: diskStorage({
    destination: join(__dirname, '..', 'uploads'), // 파일 저장 경로 설정
    filename: (req, file, callback) => {
      // 파일명 설정
      callback(null, randomUUID() + extname(file.originalname));
    },
  }),
};
