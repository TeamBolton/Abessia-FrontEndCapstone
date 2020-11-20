import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
`;

class PreviewImage extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Image src={this.props.imageObj.image} alt={this.props.imageObj.description}></Image>
    );
  }
}

export default PreviewImage;