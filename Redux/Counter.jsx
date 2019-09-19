import React, { Component } from "react";
import { connect } from "react-redux";

export class Counter extends Component {
  render() {
    console.log(this.props);

    return (
      <div className="Counter">
        <h1>{this.props.count}</h1>
        <button onClick={this.props.decrementCount(1)}> - </button>
        <button onClick={this.props.incrementCount(5)}> + </button>
      </div>
    );
  }
}

// Getter function
const mapStateToProps = (store, props) => {
  console.log("redux store: ", store);
  return { count: store.count };
};

// Setter or Update Function
// return keys must match with cases in rootReducewr
const mapDispatchToProps = (dispatch, props) => {
  return {
    incrementCount: amountToIncrement => {
      dispatch({ type: "INCREMENT_COUNT", amount: amountToIncrement });
    },
    decrementCount: amountToDecrement => {
      dispatch({ type: "DECREMENT_COUNT", amount: amountToDecrement });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
