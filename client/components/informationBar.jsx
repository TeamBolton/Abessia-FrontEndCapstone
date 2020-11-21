import React from 'react';
import styled from 'styled-components';

class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>Image {this.props.index} of {this.props.color.pictures.length}: {this.props.color.name}</div>
    );
  }
}

export default Info;