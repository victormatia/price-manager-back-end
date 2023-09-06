import { RequestHandler } from 'express';

export default class FileController {
  public validate: RequestHandler = async (req, res) => {
    
    res.status(200).json(req.file);
  };
}