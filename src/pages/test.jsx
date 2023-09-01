const updateProductData = (e) => {
  e.preventDefault();
  const newProductData = {
    ...productData,
    productName: enterTitle,
  };
  setProductData(newProductData);
};
