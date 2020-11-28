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
      data: null,
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
    if (this.props.data) {
      this.updateDataState(this.props.data);
    } else {
      this.retrieveData((error, unparsedData) => {
        this.parseData(unparsedData);
      });
    }
  }

  retrieveData(callback) {
    Axios.get('/api/products/photos')
      .then(res => {
        if (res === null || res === undefined) {
          let empty = 'retrieveData returned an empty response from the database'
          console.error(empty);
          callback(empty);
        } else {
          callback(null, res.data);
        }
      })
      .catch(err => {
        console.error('Error in retrieveData(): ' + err);
        return;
      });
  }

  parseData(unparsedData) {
    var parsedData = [];
    for (let i = 0; i < unparsedData.length; i++) {
      let currentObj = unparsedData[i];
      let parsedColors = JSON.parse(currentObj.colors);
      let newObj = {
        id: currentObj.id,
        name: currentObj.name,
        company: currentObj.company,
        price: currentObj.price,
        colors: parsedColors
      }
      parsedData.push(newObj);
    }

    this.updateDataState(parsedData);
  }

  updateDataState(data) {
    var index = this.state.currentID - 1;
    var curImgSet = data[index].colors[this.state.currentColor].pictures;
    var curColObj = data[index].colors[this.state.currentColor];
    var curImg = curImgSet[0].image;
    var curDescr = curImgSet[0].description;

    this.setState({
      data: data,
      currentProduct: data[index],
      currentImage: curImg,
      currentDescr: curDescr,
      currentImageSet: curImgSet,
      currentImageCount: curImgSet.length,
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