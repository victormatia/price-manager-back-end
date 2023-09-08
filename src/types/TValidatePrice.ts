type TRules = {cost: number, salesPrice: number}

export type TValidatePrice = (newPrice: number, { cost, salesPrice }: TRules) => (
  { isValid: boolean, message: string | null }
)