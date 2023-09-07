import { Router } from 'express';
import FileController from '../controllers/FileController';
import multerConfig from '../config/multerConfig';
import FileService from '../services/FileService';
import Client from '../Client';

const client = new Client();
const service = new FileService(client);
const controller = new FileController(service);

const route = Router();

route.post('/', multerConfig.single('file'), controller.validate);

export default route;
