import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import '../App.css'
import NFT from '../assets/nft1.jpg'


require('dotenv').config()


// const sandbox_client_id = process.env.SANDBOX_CLIENT_ID

 const CLIENT = {
   sandbox:
      // `${sandbox_client_id}`,
      'AUYvmatCz7S3lLH6Vy-pmEOf1o1SSgCVkBV8XBG3ShlsUj7TmT0rhfuqX9G23N4CU1CqxDe9gPVxu-np',
  //  production:
    
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  // componentDidMount() {
  //   const { isScriptLoaded, isScriptLoadSucceed } = this.props;

  //   if (isScriptLoaded && isScriptLoadSucceed) {
  //     PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  //     this.setState({ loading: false, showButtons: true });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "NFT Item",
          amount: {
            currency_code: "USD",
            value: 2000
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">

        {showButtons && (
          <div className='App-header'>
            <div>
              <img width="300" height="150" alt="nft-image" src={NFT} />
              <h2 className='cent'>Total: $2000</h2>
            </div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div>
            NFT IMAGE
            <h2>
              Congrats! you just paid for that picture.{" "}
            </h2>
          </div>
        )}
      </div>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);