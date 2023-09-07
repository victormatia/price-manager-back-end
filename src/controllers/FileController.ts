import { RequestHandler } from 'express';
import FileService from '../services/FileService';

export default class FileController {
  constructor(private _service: FileService) {
    this._service = _service;
  }
  public validate: RequestHandler = async (req, res) => {
    const buffer = req.file?.buffer;

    if (buffer) {
      const { result } = await this._service.validate(buffer);

      return res.status(200).json(result);
    }

    res.status(400).json({ message: 'Bad Request' });
  };
}
