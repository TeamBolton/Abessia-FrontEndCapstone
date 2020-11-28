import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
`;

class Right extends React.Component {
  constructor(props) {
    super (props);

    this.handleClick = this.props.clickHandler;
  }

  render() {
    if(this.props.count > 5) {
      return (
        <Image
          src="https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right-512.png"
          alt="Right Arrow"
          onClick={this.handleClick}>
        </Image>
      );
    } else {
      return (<div></div>);
    }
  }
}

export default Right;