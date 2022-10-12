# Old React-Router

    npm i --save react-router-dom

    npm start

## Index.js

In index.js let BrowserRouter wrap App, so React can control the URL bar and back/forward buttons

    import { BrowserRouter } from 'react-router-dom';

    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      , 
      document.getElementById('root'));

In App.js, wrap App in withRouter, then wrap all page paths in a Route component and then everything in switch
Route enables the rendering of a component if the entered url matches the paths
Switch will render the first component for which that is true

    import React, { Component } from 'react';
    import ProfilePage from './ProfilePage';
    import HomePage from './HomePage';
    import LoginPage from './LoginPage';
    import SignUpPage from './SignUpPage';
    import FourOhFourPage from './FourOhFourPage';
    import MessagePage from './MessagePage';
    import { Switch, Route, withRouter } from 'react-router-dom'
  ...
    state = {
      username: ''
    }

withRouter enables force redirect to loginPage here
    componentDidMount() {
      if (localStorage.token) {
        fetch('http://localhost:3000/profile',{
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        .then(res => res.json())
        .then(user => this.setState({username: user.username}))
      } else {
        this.props.history.push('/login')
      }
    }

    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={HomePage} >
          <Route path='/profile' component={ProfilePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/messages' component={MessagePage} />
          <Route component={FourOhFourPage} />
        </Switch>
      </React.Fragment>
    )

  ...

    export default withRouter(App);

To make browser search bar text input available to a component, use:

    <Route path='/messages/:text' component={MessagePage} />

Then in MessagePage, access that text with
    this.props.match.params.text

To move to other components, attach this to click events;
    this.props.history.push('./pagePath to go to')

Another way to move to components is with link_to
    import { Link } from 'react-router-dom'
    ...

    <ul>
    <li><Link to="/profile">Go to Profile</Link></li>
    <li><Link to="/login">Go to Login</Link></li>
    <li><Link to="/signup">Go to Signup</Link></li>
    <li><Link to="/messages/add a message using path params!">Go to Messages</Link></li>
    </ul>

To pass custom props (more than just the functionality React Router passes by default) to a component, use

    <Route path={'/profile'} render={routerProps => <ProfilePage {...routerProps} username={this.state.username}/>} />
    <Route path='/messages/:text' render={routerProps => <MessagePage {...routerProps} username={this.state.username}/>} />

The routerProps contain the default methods from react Router, and username is a custom prop