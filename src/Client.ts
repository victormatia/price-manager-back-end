import { PrismaClient, products } from '@prisma/client';

export default class Client {
  private _client = new PrismaClient();

  public async getProducts(where: any) {
    try {
      const result = await this._client.products.findMany({ where });

      return result;
    } catch (e) {
      console.error(e);
      await this._client.$disconnect();
      process.exit(1);
    }
  }

  public async updateProduct(where: any, data: products) {
    try {
      const result = await this._client.products.update({ where, data });

      return result;
    } catch (e) {
      console.error(e);
      await this._client.$disconnect();
      process.exit(1);
    }
  }

}