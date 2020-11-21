import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
`;

class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentImage: 'Image',
      currentDescr: 'Description',
      isZoom: false
    };
  }

  componentDidMount() {
    this.setState({
      currentImage: this.props.picture,
      currentDescr: this.props.description,
    });
  }



  render () {
    return (
      <Image src={this.props.picture} alt={this.props.description}></Image>
    );
  }
}

export default Main;