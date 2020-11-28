import React from 'react';
import styled from 'styled-components';
import PreviewImage from './previewImage.jsx';
import Right from './rightButton.jsx';
import Left from './leftButton.jsx';

const PreviewRow = styled.div`
display: grid;
grid-template-columns: 80px 80px 80px 80px 80px 80px 80px;
grid-template-rows: 68px;
grid-gap: 8px;
`;

class Previews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageCount: this.props.images.length,
      currentImage: this.props.images[0].image,
      currentDescr: this.props.images[0].description,
      imageArray: this.props.images,
      visibleImages: null,
      leftIndex: 0,
      isUpdatingVisImg: false
    };

    this.updateAppImage = this.updateAppImage.bind(this);
    this.leftClickHandler = this.leftClickHandler.bind(this);
    this.rightClickHandler = this.rightClickHandler.bind(this);
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
    console.log('updating visibleImages');
    this.setState({
      visibleImages: visImageArray,
      isUpdatingVisImg: false
    });
  }

  componentDidMount() {
    this.generateVisibleImageArray();
  }

  updateAppImage(index) {
    this.props.updateMain(index);
  }

  rightClickHandler() {
    console.log('right click');
    if (this.state.leftIndex > 0) {
      let newLeftIndex = this.state.leftIndex - 1;
      console.log('right click newLeftIndex: ' + newLeftIndex);
      this.setState({
        leftIndex: newLeftIndex,
        isUpdatingVisImg: true
      });

      this.generateVisibleImageArray();
    }
  }

  leftClickHandler() {
    console.log('left click');
    if (this.state.leftIndex + 5 < this.state.imageCount) {
      let newLeftIndex = this.state.leftIndex + 1;
      console.log('left click newLeftIndex: ' + newLeftIndex);
      this.setState({
        leftIndex: newLeftIndex,
        isUpdatingVisImg: true
      });

      this.generateVisibleImageArray();
    }
  }

  render () {
    if (this.state.isUpdatingVisImg) {
      this.generateVisibleImageArray();
    }

    if (this.state.visibleImages !== null) {
      const CurImgs = this.state.visibleImages;
      return (
        <PreviewRow className='grid-container'>
          <Left className="grid-item" count={this.state.imageCount} clickHandler={this.leftClickHandler} data-test="left-button"/>

          {CurImgs.map((imageObj) =>
            (
              <PreviewImage
                data-test="preview-image"
                className='grid-item'
                key={imageObj.index}
                index={imageObj.index}
                imageObj={imageObj.picture}
                signalUpdate={this.updateAppImage}/>
            )
          )}

          <Right className="grid-item" count={this.state.imageCount} clickHandler={this.rightClickHandler} data-test="right-button"/>
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