Redux gives you a single object with every peice of state in your app. Upon state changes. Redux returns a new copy of global state, with the modification applied to only the relevant part of the state object. 

levels of Redux;

# Store 
App-wide global object serving as central repository of state

# Component Views
React Components, receive state from store. User events fire off actions.

# Action
Dispatch actions to mutate store state. Usually return a payload object

# Dispatch
Sends action to reducer

# Reducer
Specify how app state changes depending on the specific action. Contains the data we want to save to store. Returns new state


<!-- //////////////////////////////////////////////////////////////// -->

# Setup
    npx create-react-app my-react-app
    npm i --save redux react-redux redux-thunk react-router-dom

# Basic idea all in index.js
    import { createStore } from 'redux' 


// STORE -> GLOBALIZED state

// ACTIONS INCREMENT, DECREMENT
    const increment = () => {
      return {
        type: 'INCREMENT'
      }
    }

    const decrement = () => {
      return {
        type: 'DECREMENT'
      }
    }

// REDUCER 
    const counter = (state=0, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
      }
    }

    let store = createStore(counter);

// DISPATCH 
    store.dispatch(increment());


// view state
    store.subscribe( () => console.log(store.getState() ) );

# Now seperate the same logic above into seperate files

1) Add store in index.js
2) Create folders reducers, add in it reetReducer.js, counter.js, isLogged.js






-----------------

thunk 







