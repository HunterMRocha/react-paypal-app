import React, { Component } from "react";
import './App.css'
import NFT from './assets/nft1.jpg'
import PaypalButton from "./components/PaypalButton";


class App extends Component{
  state = {
    showPaypal: false
  };

  showPaypalButtons = () => {
    this.setState({ showPaypal: true });
  };

  render() {
    const { showPaypal } = this.state;
    if (showPaypal) {
      return <PaypalButton />;
    } else {
      return (
        <div className="App-header">
          <h2> LIMITED EDITION NFT </h2>
          <img width="550" height="300" alt="nft-image" src={NFT} />
          <h3>
            <b>PRICE $2000</b>
          </h3>
          <button className='button1' onClick={this.showPaypalButtons}> Pay </button>
        </div>
      );
    }
  }
}

export default App;