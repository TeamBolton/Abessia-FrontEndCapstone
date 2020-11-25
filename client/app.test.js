//Initialization
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//Components and Files
import App from './app';
import Info from './components/informationBar';
import Previews from './components/previewImages';

Enzyme.configure({
  adapter: new Adapter()
});

const Data = require('../server/fakerData.js');
const Seed = require('../server/seedDB.js');
const TestDataSet = Seed.generateProductsTable(100);

//DRY functions and helper methods
const setup = () => {
  return shallow(<App data={TestDataSet} ID={1}/>);
}

const findByTestAttr = (Wrapper, string) => {
  return Wrapper.find(`[data-test='${string}']`);
}

//Unit Tests
test('App renders without crashing', () => {
  const Wrapper = setup();
  //console.log(Wrapper.debug());
  expect(Wrapper).toBeTruthy();
});

test('TestDataSet Exists with 100 data entries', () => {
  expect(TestDataSet.length).toBe(100);
});

test('App renders a main image component', () => {
  const Wrapper = setup();
  const Main = findByTestAttr(Wrapper, "main-image");
  expect(Main.length).toBe(1);
});

test('App renders a preview image bar', () => {
  const Wrapper = setup();
  const Previews = findByTestAttr(Wrapper, "previews");
  expect(Previews.length).toBe(1);
});

test('App renders a left button', () => {
  const Wrapper = setup();
  const Left = findByTestAttr(Wrapper, "left-button");
  expect(Left.length).toBe(1);
});

test('App renders a right button', () => {
  const Wrapper = setup();
  const Right = findByTestAttr(Wrapper, "right-button");
  expect(Right.length).toBe(1);
});

test('App renders an info bar', () => {
  const Wrapper = setup();
  const Info = findByTestAttr(Wrapper, "info-bar");
  expect(Info.length).toBe(1);
});

test('Info bar displays current picture, number of pictures, and the current color name', () => {
  const sampleColor = TestDataSet[0].colors.[0];
  const InfoBar = shallow(<Info color={sampleColor} index={1}/>);
  const InfoText = InfoBar.text();

  expect(InfoText).toBe(`Image ${1} of ${sampleColor.pictures.length}: ${sampleColor.name}`);
});

test('Preview Image Bar displays 5 or fewer images', () => {
  var samplePictures = [];
  while (samplePictures.length < 6) {
    samplePictures = Data.newPicArray();
  }

  const PreviewBar = shallow(<Previews images={samplePictures}/>);
  const Images = findByTestAttr(PreviewBar, "preview-image");

  expect(Images.length).toBeLessThan(6);
});