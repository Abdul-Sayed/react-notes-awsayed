Redux gives you a single object with every peice of state in your app. Upon state changes. Redux returns a new copy of global state, with the modification applied to only the relevant part of the state object. 

levels of Redux;

# Store 
App-wide global object serving as central repository of state

# Component Views
React Components, receive state from store. User events fire off actions.

# Action
Dispatch actions to mutate store state. Usually return a payload object. When an action cccurs, it gets sent to all reducers

# Dispatch
Sends action to reducer

# Reducer
Reducers take state and an action. They specify how app state changes depending on the type of action. Can contain the data we want to save to store. Returns new state.
 


<!-- //////////////////////////////////////////////////////////////// -->

# Setup
    npx create-react-app my-react-app
    npm i --save redux react-redux redux-thunk react-router-dom





