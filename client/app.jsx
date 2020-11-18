import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveData = this.retrieveData.bind(this);
    this.parseData = this.parseData.bind(this);
    this.state = {data: null};
  }

  componentDidMount() {
    this.retrieveData((error, unparsedData) => {
      this.parseData(unparsedData);
    });
  }

  retrieveData(callback) {
    Axios.get('/api/products/photos')
      .then(res => {
        if (res === null || res === undefined) {
          let empty = 'retrieveData returned an empty response from the database'
          console.error(empty);
          callback(empty);
        } else {
          callback(null, res.data);
        }
      })
      .catch(err => {
        console.error('Error in retrieveData(): ' + err);
        callback(err);
      });
  }

  parseData(unparsedData) {
    var parsedData = [];
    for (let i = 0; i < unparsedData.length; i++) {
      let currentObj = unparsedData[i];
      let parsedColors = JSON.parse(currentObj.colors);
      let newObj = {
        id: currentObj.id,
        name: currentObj.name,
        company: currentObj.company,
        price: currentObj.price,
        colors: parsedColors
      }
      parsedData.push(newObj);
    }
    console.log(parsedData);
    this.setState({data: parsedData});
  }

  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));