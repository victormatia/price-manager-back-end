import { RequestHandler } from 'express-serve-static-core';
import convertFile from '../utils/convertFIle';

/*eslint max-len: off*/
const message = 'Certifique-se que os campos "product_code" e "new_price" existam e estejam preenchidos corretamente no arquivo';

export default class Fields {
  public validate: RequestHandler = async (req, res, next) => {
    const buffer = req.file?.buffer;
    const [headers, ...lines] = await convertFile(buffer as Buffer);

    const areValidHeaders = this.validateHeaders(headers);
    // On²
    const areValidLines = lines.every((e: string[]) => this.validateLines(e));

    if(areValidHeaders && areValidLines) return next();
      
    res.status(400).json({ message });
  };

  private validateHeaders(headers: string[]) {
    return headers.includes('product_code') && headers.includes('new_price');
  }

  private validateLines(line: string[]) {
    return line.every((e: string) => !isNaN(Number(e)));
  }

}