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

      return res.status(203).json(result);
    }

    res.status(400).json({ message: 'Bad Request' });
  };

  public update: RequestHandler = async (_req, res) => {
    const { result, message } = await this._service.update();

    if (message) return res.status(400).json({ message });

    res.status(200).json(result);
  };
}
