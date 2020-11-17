const Jest = require('jest');
const Data = require('./fakerData.js');
const Seed = require('./seedDB.js');
const Server = require('./index.js');

describe('Jest: ', () => {
  it('loads properly in server.spec.js', () => {
    expect(true).toEqual(true);
  });
});

describe('Faker: ', () => {
  var testProduct = Data.newProduct();

  it('creates a fake product', () => {
    expect(typeof testProduct.name).toBe('string');
    expect(typeof Number.parseFloat(testProduct.price)).toBe('number');
    expect(Array.isArray(testProduct.colors)).toBe(true);
    expect(testProduct.colors.length > 0 && testProduct.colors.length < 5).toBe(true);
    expect(typeof testProduct.company).toBe('string');
  });

  it('creates a fake picture', () => {
    var testPicture = Data.newPicture();
    expect(testPicture).toHaveProperty('image');
    expect(typeof testPicture.description).toBe('string');
  });

  it('creates an array of fake picture / description pairs', () => {
    var testPicArray = Data.newPicArray();
    expect(testPicArray).toBeDefined();
    expect(Array.isArray(testPicArray)).toBe(true);
  });
});

describe('seedDB: ', () => {
  var testDataSet = Seed.generateProductsTable(100);
  var connection = Seed.makeConnection('testrewhy');

  it('successfully calls newProduct 100 times', () => {
    expect(Array.isArray(testDataSet)).toBe(true);
    expect(testDataSet.length).toBe(100);
  });

  it('adds 100 products objects from a given productsTable to a SQL database', () => {
    Seed.seedDataBase(testDataSet, connection, 'testproducts', (error, result) => {
      expect(result !== undefined).toBe(true);
      expect(result !== null).toBe(true);
    });
  });
});