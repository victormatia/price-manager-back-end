import multer from 'multer';
// import path from 'path';

// const multerConfig = multer({
//   dest: path.resolve(__dirname, '..', 'temp', 'uploads'),
//   storage: multer.diskStorage({
//     destination: path.resolve(__dirname, '..', 'temp', 'uploads'),
//     filename: (_req, file, callback) => {
//       callback(null, file.originalname);
//     },
//   }),
//   fileFilter: (_req, file, callback) => {
//     if (file.mimetype === 'text/csv') {
//       callback(null, true);
//     } else {
//       callback(new Error('Invalid file type'));
//     }
//   },
// });

const multerConfig = multer();

export default multerConfig;
