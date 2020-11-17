const faker = require('faker');

//newProduct creates an appropriately formated object for storage in the Products SQL table
const newProduct = () => {
  var productObj = {};
  productObj.name = faker.commerce.productName();
  productObj.company = faker.company.companyName();
  productObj.colors = selectColors();
  productObj.price = faker.commerce.price();
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
  return picArray;
}

const newPicture = () => {
  var picObj = {};

  //generate a number from 1 to 30
  var picIndex = Math.floor((Math.random() * 29) +1);

  picObj.image = S3PicURLs[picIndex];
  picObj.description = faker.lorem.sentence();

  return picObj;
}

function generatePicData () {
  var picArray = [];
  for (let i = 1; i < 31; i++) {
    picArray.push(`https://rewhypictures.s3.us-east-2.amazonaws.com/images/boots${i}.jpeg`)
  }
  return picArray;
}

const S3PicURLs = generatePicData();

module.exports = {
  newProduct,
  newPicture,
  newPicArray
};