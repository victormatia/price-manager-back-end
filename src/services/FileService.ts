import Client from '../Client';
import { validatePrice } from '../utils/validatePrice';
import convertFile from '../utils/convertFIle';

export default class FileService {
  constructor(private _client: Client) {
    this._client = _client;
  }

  public async validate(buffer: Buffer) {
    const [, ...lines] = await convertFile(buffer);

    // On
    const areValidPrices = await Promise.all(lines.map(async (line: string[]) => {
      const [product] = await this._client.getProducts({code: line[0]});
      const newPrice = Number(line[1]);
      const cost = Number(product.cost_price);
      const salesPrice = Number(product.sales_price);

      const { isValid, message } = validatePrice(newPrice, { cost, salesPrice });
      return { productCode: Number(product.code), isValid, message };
        
    })); 

    return { result: [...areValidPrices] };
  }
}