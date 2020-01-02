import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2 style={defaultStyle}>Number text</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, 'font-size': '54px'}}>
        <input type="text"/>

      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img />
        <h3>Playlist name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={defaultStyle}>Title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  } 
}

export default App;
