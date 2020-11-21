import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
  border: 1px solid lightgrey;
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
    /*this.setState({
      isSelected: true
    });*/
    console.log('Click at ' + this.state.index + '.');

    this.props.signalUpdate(this.state.index);
  }

  render() {
    return(
      <Image
        src={this.props.imageObj.image}
        alt={this.props.imageObj.description}
        onClick={this.handleClick}>
      </Image>
    );
  }
}

export default PreviewImage;