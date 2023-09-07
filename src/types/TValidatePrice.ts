type TRules = {cost: number, salesPrice: number}

export type TValidatePrice = (price: number, { cost, salesPrice }: TRules) => ({ message: string | null })