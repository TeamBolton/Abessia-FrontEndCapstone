import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto;
  gird-template-rows: auto auto auto auto auto auto auto auto auto;
  grid-gap: 2px;
  background: cornflowerblue;
`;

const Item = styled.div`
  font-size: 18px;
  text-align: center;
  border: 1px solid;
`;

const MainImage = styled(Item)`
  grid-area: main-image;
  grid-column: 1 / 8;
  grid-row: 1 / 8;
  background: white;
`;

const LeftButton = styled(Item)`
  grid-area: left-button;
  grid-column: 1;
  grid-row: 8;
  background: white;
`;

const RightButton = styled(Item)`
  grid-area: right-button;
  grid-column: 7;
  grid-row: 8;
  background: white;
`;

const PreviewImageBar = styled(Item)`
  grid-area: preview-image-bar
  grid-column: 2 / 6;
  grid-row: 8;
`;

const InfoBar = styled(Item)`
  grid-area: info-bar;
  grid-column: 1 / 5;
  grid-row: 9;
`;

const Blank = styled(Item)`
  grid-area: blank;
  grid-column: 8 / 13;
  grid-row: 8 / 10;
  border: 0px;
`;

const ZoomImage = styled(Item)`
  grid-area: zoom-image;
  grid-column: 8 / 13;
  grid-row: 1 / 7;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveData = this.retrieveData.bind(this);
    this.parseData = this.parseData.bind(this);
    this.state = {data: null};
  }

  componentDidMount() {
    this.retrieveData((error, unparsedData) => {
      this.parseData(unparsedData);
    });
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
        callback(err);
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
    console.log(parsedData);
    this.setState({data: parsedData});
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Grid class="grid-container">
          <MainImage class="grid-item">Main Image</MainImage>
          <ZoomImage class="grid-item">Zoom Image</ZoomImage>
          <LeftButton class="grid-item">Left</LeftButton>
          <PreviewImageBar class="grid-item">Preview Images</PreviewImageBar>
          <RightButton class="grid-item">Right</RightButton>
          <Blank class="grid-item"></Blank>
          <InfoBar class="grid-item">Information</InfoBar>
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));