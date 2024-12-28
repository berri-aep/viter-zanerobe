export const getClothesByCategory = (categoryId, dataclothes) => {
  let result = [];

  dataclothes?.data.map((item) => {
    if (Number(categoryId) === Number(item.category_aid)) {
      result.push(item);
    }
  });

  return result;
};

export const getCategoryPrices = (dataCategory, dataClothes) => {
  let result = [];
  let resultCategoryId = [];

  dataCategory?.data.map((categoryItem) => {
    let isResultCategoryExist = false;
    dataClothes?.data.map((clothesItem) => {
      //boolean check if category exist in result category array
      isResultCategoryExist = resultCategoryId.includes(
        Number(categoryItem.category_aid)
      );

      //get index of existing category
      const getIndexCategoryItem = resultCategoryId.indexOf(
        clothesItem.clothes_category_id
      );

      //if category not exist and category with price
      if (
        Number(categoryItem.category_aid) ===
          Number(clothesItem.clothes_category_id) &&
        isResultCategoryExist === false
      ) {
        resultCategoryId.push(categoryItem.category_aid);
        result.push({
          ...categoryItem,
          clothe_price: Number(clothesItem.clothes_price),
        });
      }

      //if category exist add clothe prce to category
      if (
        Number(categoryItem.category_aid) ===
          Number(clothesItem.clothes_category_id) &&
         isResultCategoryExist === true &&
        getIndexCategoryItem >= 0
      ) {
        result[getIndexCategoryItem].clothe_price += Number(clothesItem.clothes_price);
      }
    });
    if (!isResultCategoryExist) {
      result.push({ ...categoryItem, clothe_price: 0 });
      resultCategoryId.push(categoryItem.category_aid);
    }
  });
  return result;
};
