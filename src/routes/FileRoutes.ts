import { Router } from 'express';
import FileController from '../controllers/FileController';
import multerConfig from '../config/multerConfig';
import FileService from '../services/FileService';
import Client from '../Client';
import Fields from '../middleware/Fields';

const client = new Client();
const service = new FileService(client);
const controller = new FileController(service);
const middleware = new Fields();

const route = Router();

route.post('/', multerConfig.single('file'), middleware.validate, controller.validate);

route.put('/', controller.update);

export default route;
