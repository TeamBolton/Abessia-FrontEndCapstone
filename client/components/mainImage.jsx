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
      currentImage: "",
      currentDescr: "Description Here",
      currentColor: "Color Here",
      isZoom: false
    };
  }

  componentDidMount() {
    console.log(this.props.product);
    this.setState({
      currentImage: this.props.product.colors[0].pictures[0].image,
      currentDescr: this.props.product.colors[0].pictures[0].description,
      currentColor: this.props.product.colors[0],
    });
  }

  render () {
    return (
      <Image src={this.state.currentImage} alt={this.state.currentDescr}></Image>
    );
  }
}

export default Main;