import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, TEMP_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        console.log(file);
        //для завантаження фото і т.д. не перетираючи інше
        // але завантажуємо, коли фото з однаковою назвою
        cb(null, `${uniqueSuffix}_${file.originalname}`);
    },
});
export const upload = multer({ storage });