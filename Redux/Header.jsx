import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";

export class Header extends Component {
  renderDescription = () => {
    const remainder = this.props.count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${this.props.count + upToNext}`;
  };

  render() {
    console.log(this.props);

    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

// This component needs to access state to render data

const mapStateToProps = (store, props) => {
  console.log("redux store: ", store);
  return { count: store.count };
};

// This component does not need to update state

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     incrementCount: () => {
//       dispatch({ type: "INCREMENT_COUNT", amount: 1 });
//     }
//   };
// };

export default connect(
  mapStateToProps,
  null
)(Header);
