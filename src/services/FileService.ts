import Client from '../Client';
import { Readable } from 'stream';
import * as readline from 'readline/promises';
import { validatePrice } from '../utils/validatePrice';

export default class FileService {
  constructor(private _client: Client) {
    this._client = _client;
  }

  public async validate(buffer: Buffer) {
    const [, ...lines] = await this.convertFile(buffer);

    // On
    const messages = await Promise.all(lines.map(async (line: string[]) => {
      const [product] = await this._client.getProducts({code: line[0]});
      const newPrice = Number(line[1]);
      const cost = Number(product.cost_price);
      const salesPrice = Number(product.sales_price);

      const { message } = validatePrice(newPrice, { cost, salesPrice });
      return { productCode: Number(product.code), message };
        
    })); 

    return { result: {...messages} };
  }

  private async convertFile(buffer: Buffer) {
    const readableFile = new Readable();

    readableFile.push(buffer);
    readableFile.push(null);

    const fileLines = readline.createInterface({input: readableFile});

    const arrLines = [];

    // On
    for await(const line of fileLines) {
      arrLines.push(line.split(','));
    }

    return arrLines;
  }
}