import Client from '../Client';
import { validatePrice } from '../utils/validatePrice';
import convertFile from '../utils/convertFIle';
import { Decimal } from '@prisma/client/runtime/library';
import { products } from '@prisma/client';

export default class FileService {
  private _lines: string[][] = [];
  
  constructor(private _client: Client) {
    this._client = _client;
  }

  public async validate(buffer: Buffer) {
    const [, ...lines] = await convertFile(buffer);

    this._lines = lines;

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

  public async update() {
    const lines = this._lines;

    if(!lines) return { message: 'É necessário validar o arquivo antes'};
    
    const result = await Promise.all(lines.map(async (line) => {
      const newPrice = Number(line[1]) as unknown;

      const productsUpdated = {sales_price: newPrice as Decimal} as products;

      const {code, cost_price, name, sales_price} = await this._client.updateProduct({code: line[0]}, productsUpdated);

      return { code: Number(code), 'cost_price': Number(cost_price), name, 'sales_price': Number(sales_price) };
    }));

    return { result };
  }
}