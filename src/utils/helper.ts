export const truncateBrandName = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
};

export const getCartProducts = (
  product: any[],
  favoriteIds: string | any[],
) => {
  const filteredProducts = product
    ?.filter((item: {id: any}) => favoriteIds?.includes(item.id))
    .map((item: any) => ({...item, quantity: 1}));

  return filteredProducts;
};
