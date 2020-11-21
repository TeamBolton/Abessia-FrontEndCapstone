import React from 'react';
import styled from 'styled-components';
import PreviewImage from './previewImage.jsx';

const PreviewRow = styled.div`
display: grid;
grid-template-columns: 80px 80px 80px 80px 80px;
grid-template-rows: 68px;
grid-gap: 8px;
`;

class Previews extends React.Component {
  constructor(props) {
    super(props);
    this.updateAppImage = this.updateAppImage.bind(this);

    this.state = {
      imageCount: this.props.images.length,
      currentImage: this.props.images[0].image,
      currentDescr: this.props.images[0].description,
      imageArray: this.props.images,
      visibleImages: null,
      leftIndex: 0, //this will be effected by clicking the R/L arrows
    };
  }

  generateVisibleImageArray() {
    var visImageArray = [];
    for (let i = this.state.leftIndex; i < this.state.leftIndex + 5; i++) {
      if (this.state.imageArray[i] === undefined) {
        break;
      } else {
        visImageArray.push({index: i, picture: this.state.imageArray[i]});
      }
    }

    this.setState({
      visibleImages: visImageArray
    });
  }

  componentDidMount() {
    this.generateVisibleImageArray();
  }

  updateAppImage(index) {
    console.log('Index sent to Previews.updateAppImage: ' + index);
    this.props.updateMain(index);
  }

  render () {
    if (this.state.visibleImages !== null) {
      const CurImgs = this.state.visibleImages;
      return (
        <PreviewRow className='grid-container'>
          {CurImgs.map((imageObj) =>
            (
              <PreviewImage
                className='grid-item'
                key={imageObj.index}
                index={imageObj.index}
                imageObj={imageObj.picture}
                signalUpdate={this.updateAppImage}/>
            )
          )}
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