import { TValidatePrice } from '../types/TValidatePrice';

export const validatePrice: TValidatePrice = (newPrice, { cost, salesPrice }) => {
  if (newPrice < cost) return { isValid: false, message: 'O novo preço deve ser maior que o preço de custo' };
  
  else if ((salesPrice * 0.1) < (salesPrice - newPrice || newPrice - salesPrice)) {
    return { isValid: false, message: 'O novo preço não deve ultrapassar 10% do preço atual' };
  }

  return { isValid: true, message: null };
};