import React from 'react';
import styled from 'styled-components';
import Magnify from 'react-image-magnify';

const Zoom = styled(Magnify)`
  .main-image = {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
  }

  .zoom-image = {
    object-fit: cover;
    width: 50%;
    max-height: 50%;
  }
`;

class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentImage: 'Image',
      currentDescr: 'Description',
    };
  }

  componentDidMount() {
    this.setState({
      currentImage: this.props.picture,
      currentDescr: this.props.description,
    });
  }



  render () {
    var smallImg = {
      src: this.props.picture,
      isFluidWidth: true,
      alt: this.props.description
    };

    var largeImg = {
      src: this.props.picture,
      width: 2200,
      height: 2200
    };

    var magnifyProps = {
      smallImage: smallImg,
      largeImage: largeImg,
      imageClassName: 'main-image',
      enlargedImageClassName: 'zoom-image',
    }

    return (
      <Zoom {...magnifyProps} data-test="current-main-image"/>
    );
  }
}

export default Main;