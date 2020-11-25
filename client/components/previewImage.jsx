import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
  border: 1px solid lightgrey;
`;

const SelectedImage = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
  border: 1px solid lightblue;
`;

class PreviewImage extends React.Component{
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isSelected: false,
      index: this.props.index
    }
  }

  handleClick() {
    this.setState({
      isSelected: true
    });
    this.props.signalUpdate(this.state.index);
  }

  render() {
    if(!this.state.isSelected) {
      return(
        <Image
          src={this.props.imageObj.image}
          alt={this.props.imageObj.description}
          onClick={this.handleClick}>
        </Image>
      );
    } else if (this.state.isSelected) {
      return(
        <SelectedImage
        src={this.props.imageObj.image}
        alt={this.props.imageObj.description}
        onClick={this.handleClick}>
      </SelectedImage>
      );
    }
  }
}

export default PreviewImage;