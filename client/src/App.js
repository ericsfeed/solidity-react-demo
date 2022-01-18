import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import MessagesContract from "./contracts/Messages.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  constructor(props) {      // atm this does nothing and will trigger a warning. 
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null };
  }
  

  // this bit runs once after 1st render 
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // get the network id 
      const networkId = await web3.eth.net.getId();

      // Get the first contract instance.
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Get the second contract instance.
      const deployedNetwork2 = SimpleStorageContract.networks[networkId];
      const instance2 = new web3.eth.Contract(
        MessagesContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );
      
      //
      // TODO write code to initialize the message listing
      //

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // @notice this is a callback that is run after setState is completed and rendered 
  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default, in the CONTRACT
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update react state with the result.
    this.setState({ storageValue: response });
  };


  render() {
    if (!this.state.web3) {
      return <div>Waiting for metamask...</div>;
    }
    return (
      <div className="App">
        <h1>Welcome!</h1>
        <p>The demonstration program is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If the contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
