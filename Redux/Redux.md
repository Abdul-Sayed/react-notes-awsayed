npm i --save redux

in index.js 
    import { createStore } from 'redux' 

createStore is a function that takes 3 arguments; A reducer function, preloadedState, and enhancer. It returns the store object

The reducer defines the logic of how to update state

    const reducer = (prevState={count: 0}, action) => {
      // return an object to initialize as state
      switch (action.type) 
        case "UPDATE_COUNT"
          return {count: action.count}
        case  "INCREMENT_COUNT"
          return {count: prevState.count + action.amount}
        case "DECREMENT_COUNT"
          return {count: prevState.count - action.amount}
        default: return prevState
    }

    const store = createStore(reducer )

Using `store`, we can use the methods getState to retrieve state, and dispatch to update state

    store.getState()    //=> {count: 0}
    store.dispatch({ type: "INCREMENT_COUNT", amount: 3 })  //=> we dispatch the action { type: "INCREMENT_COUNT" } and get {count: 1}


# React-redux
    npm i --save react-redux

If a component needs to consume state to render something or needs to update state, it should connect to the store

