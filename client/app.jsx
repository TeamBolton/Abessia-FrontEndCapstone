//dependencies
import React from 'react';
import $ from 'jquery';
import Axios from 'axios';
import styled from 'styled-components';

//components
import Main from './components/mainImage.jsx';
import Info from './components/informationBar.jsx';
import Previews from './components/previewImages.jsx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 85px 85px 85px 85px 85px 85px 85px;
  grid-template-rows: 85px 85px 85px 85px 85px 85px 85px 85px;
  grid-gap: 2px;
`;

const Item = styled.div`
  font-size: 18px;
  text-align: center;
`;

const MainImage = styled(Item)`
  grid-area: main-image;
  grid-column: 1 / 8;
  grid-row: 1 / 8;
`;

const PreviewImageBar = styled(Item)`
  grid-area: preview-image-bar;
  grid-column: 1 / 8;
  grid-row: 8;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.retrieveData = this.retrieveData.bind(this);
    this.parseData = this.parseData.bind(this);
    this.updateMainImage = this.updateMainImage.bind(this);
    this.updateDataState = this.updateDataState.bind(this);

    this.state = {
      currentID: this.props.ID,
      currentColor: 0, //default to 0
      currentColorObject: null,
      currentImage: null,
      currentDescr: null,
      currentProduct: null,
      currentImageSet: null,
      currentImageCount: null,
      currentImgIndex: 1, //default to 1
    };
  }

  componentDidMount() {
    console.log(window.location.pathname);
    const path = window.location.pathname;
    let id = path.slice(1);
    if (id.indexOf('/')) {
      id.slice(0, (id.indexOf('/')));
    }
    console.log('id: ', id);

    if (this.props.productObj) {
      this.updateDataState(this.props.productObj);
    } else {
      this.retrieveData(id, (error, unparsedData) => {
        if(error !== null) {
          console.error(error);
        } else {
          console.log('this.parseData being called with:');
          console.log(unparsedData);
          this.parseData(unparsedData);
        }
      });
    }
  }

  retrieveData(id=1, callback) {
    Axios.get(`/api/products/photos/${id}`)
      .then(res => {
        if (res === null || res === undefined) {
          let empty = 'retrieveData returned an empty response from the database';
          console.error(empty);
          callback(empty);
        } else {
          console.log('app.jsx retrieveData method calling callback with res.data: ');
          console.log(res.data);
          callback(null, res.data);
        }
      })
      .catch(err => {
        console.error('Error in retrieveData(): ' + err);
        return;
      });
  }

  parseData(unparsedData) {
    let currentObj = unparsedData.pop();
    let parsedColors = JSON.parse(currentObj.colors);
    let newObj = {
      id: currentObj.id,
      name: currentObj.name,
      company: currentObj.company,
      price: currentObj.price,
      colors: parsedColors
    }

    this.updateDataState(newObj);
  }

  updateDataState(productObj) {
    var index = productObj.id - 1;
    var colorNum = Math.floor(Math.random() * productObj.colors.length);
    var curImgSet = productObj.colors[colorNum].pictures;
    var curColObj = productObj.colors[colorNum];

    var curImg = curImgSet[0].image;
    var curDescr = curImgSet[0].description;

    this.setState({
      currentProduct: productObj,
      currentImage: curImg,
      currentDescr: curDescr,
      currentImageSet: curImgSet,
      currentImageCount: curImgSet.length,
      currentColor: colorNum,
      currentColorObject: curColObj
    });
  }

  updateMainImage(index) {
    var newImg = this.state.currentImageSet[index].image;
    var newDescr = this.state.currentImageSet[index].description;
    this.setState({
      currentImage: newImg,
      currentDescr: newDescr,
      currentImgIndex: index + 1
    });
  }

  render() {
    if (this.state.currentProduct === null) {
      return (
        <div>Waiting. . .</div>
      );
    } else {
      return (
        <div>
          <Grid className="grid-container" data-test="master-grid">
            <MainImage className="grid-item" data-test="main-image-grid">
              <Main picture={this.state.currentImage} description={this.state.currentDescr} data-test="main-image"/>
            </MainImage>
            <PreviewImageBar className="grid-item" data-test="preview-bar-grid">
              <Previews images={this.state.currentImageSet} updateMain={this.updateMainImage} data-test="previews"/>
            </PreviewImageBar>
          </Grid>
          <Info color={this.state.currentColorObject} index={this.state.currentImgIndex} data-test="info-bar"/>
        </div>
      );
    }
  }
}

export default App;