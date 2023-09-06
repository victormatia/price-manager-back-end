import { Router } from 'express';
import FileController from '../controllers/FileController';
import multer from 'multer';

const multerconfig = multer();

const controller = new FileController();

const route = Router();

route.post('/', multerconfig.single('file'), controller.validate);

export default route;
