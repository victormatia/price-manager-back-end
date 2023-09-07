import { TValidatePrice } from '../types/TValidatePrice';

export const validatePrice: TValidatePrice = (price, { cost, salesPrice }) => {
  if (price < cost) return { message: 'O novo preço deve ser maior que o preço de custo' };
  
  else if ((salesPrice * 0.1) < (salesPrice - price || price - salesPrice)) {
    return { message: 'O novo preço não deve ultrapassar 10% do preço atual' };
  }

  return { message: null };
};