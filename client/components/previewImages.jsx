import React from 'react';
import styled from 'styled-components';
import PreviewImage from './previewImage.jsx';

const PreviewRow = styled.div`
display: grid;
grid-template-columns: 85px 85px 85px 85px 85px;
grid-template-rows: 85px;
grid-gap: 2px;
`;

class Previews extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      imageCount: this.props.images.length,
      currentImage: this.props.images[0].image,
      currentDescr: this.props.images[0].description,
      imageArray: this.props.images,
      visibleImages: null,
      leftIndex: 0 //this will be effected by clicking the R/L arrows
    };
  }

  generateVisibleImageArray() {
    var visImageArray = [];
    for (let i = this.state.leftIndex; i < this.state.leftIndex + 5; i++) {
      if (this.state.imageArray[i] === undefined) {
        break;
      } else {
        visImageArray.push(this.state.imageArray[i]);
      }
    }

    this.setState({
      visibleImages: visImageArray
    });
  }

  componentDidMount() {
    this.generateVisibleImageArray();
  }

  render () {
    if (this.state.visibleImages !== null) {
      const CurImgs = this.state.visibleImages;
      return (
        <PreviewRow className='grid-container'>
          {CurImgs.map((imageObj, index) => <PreviewImage className='grid-item' key={index} imageObj={imageObj}/>)}
        </PreviewRow>
      );
    } else {
      return (
        <div>Image Preview Bar</div>
      );
    }
  }
}

export default Previews;