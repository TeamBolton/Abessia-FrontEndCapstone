const faker = require('faker');

const newProduct = () => {
  var productObj = {};
  productObj.name = faker.commerce.productName();
  productObj.company = faker.company.companyName();
  productObj.colors = selectColors();
  productObj.price = faker.commerce.price();

  console.log(productObj);
  return productObj;
}

const selectColors = () => {
  //generate between 1 and 4 colors
  var numColor = Math.floor((Math.random() * 3) + 1);
  var colors = [];

  for (let i = 0; i < numColor; i++) {
    let newColor = {};
    newColor.name = faker.commerce.color();
    newColor.pictures = newPicArray();
    colors.push(newColor);
  }

  return colors;
}

const newPicArray = () => {
  var picArray = [];
  //generate 1 to 8 image/description pairs
  var numPics = Math.floor((Math.random() * 7) + 1);
  for (let j = 0; j < numPics; j++) {
    picArray.push(newPicture());
  }
  console.log(picArray);
  return picArray;
}

const newPicture = () => {
  var picObj = {};

  picObj.image = faker.image.fashion();
  picObj.description = faker.lorem.sentence();

  return picObj;
}

module.exports = {
  newProduct,
  newPicture,
  newPicArray
};

