 # Installation

npm install -g create-react-app && create-react-app my-react-app
or just npx create-react-app my-react-app

npm install -g json-server
json-server --watch db.json
json-server -p 8080 db.json

npm install && npm start

PORT=3000 npm start   //=> or whatever other port

This sets up a development server, webpack for bundling, and babel for compilation of JSX to es5

# UUId
Generate Random id

import uuid from "uuid";

id: uuid.v4(),

## VSCode Hotkeys
Get JS JSX code snippets and React.js code snippets extensions

	rcc //=> generates React Class Component

	rfc  //=> generates React Functional Component

Class Components
	cc //=>
	class "__" extends Component {
		state = {  }
		render() { 
			return (  );
		}
	}
	
	export default "__";

Stateless Functional Components
	sfc //=>
	const "__" = (props) => {
		return ( 
			<!-- render props here -->
		 );
	}
	
	export default "__";


# Named exports vs Default exports 
https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910

Named Export: 

	// export side
	import React from "react"

	export const Hello = () => {
			return (
					<div>
						...
					</div>
			)
	}

	...
	// import side
	import React, { Component } from 'react';
	import {Hello} from './Hello';

	export class App extends Component {

		render() {
			return (
				<React.Fragment>
					<Hello />
				</React.Fragment>
			)
		}
	}

Default Export: 

	// export side
	const MyComponent = () => {}
  ...
	export default MyComponent;

	// import side
	import MyDefaultComponent from "./MyDefaultExport";
  


# Styles 

## Inline styles

	<h1 style={{color: "#FF2D00", backgroundColor: "#FF8C00"}}>Good {timeOfDay}!</h1>

## Variable styles

		<!-- Note the camel case property names -->
		const styles = {
			color: "#FF2D00", 
			backgroundColor: "#FF8C00",
			fontSize: "20px"
		}

		return (
			<h1 style={styles}>Good {timeOfDay}!</h1>
		)

## Conditional styles 

import React from "react"
import './App.css';

const date = new Date()
const hours = date.getHours()
let timeOfDay

const styles = {
    fontSize: 30
}

if (hours < 12) {
    timeOfDay = "morning"
    styles.color = "#04756F"
} else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon"
    styles.color = "#2E0927"
} else {
    timeOfDay = "night"
    styles.color = "#D90000"
}

function App() {
    return (
        <React.Fragment>
            <h1 style={styles}>Good {timeOfDay}!</h1>
        </React.Fragment>
    )
}

## Import styles (best, especially for mediaqueries, psuedoselectors, vendor prefixes)

In App.css;
	body {
		color: #FF2D00;
		background-color: #FF8C00;
		font-size: 20px;
	}
In App.js; 
	import './App.css';

export default App

## Dynamic Styling 

	export default class Todoitem extends Component {
		state = {};

		getStyle = () => {
			return {
				background: "#f4f4f4",
				padding: "10px",
				borderBottom: "1px #ccc dotted"
			};
		};

		crossedOff = () => {
			const completedStyle = {
				fontStyle: "italic",
				color: "#cdcdcd",
				textDecoration: "line-through"
			};
			return this.props.todo.completed ? completedStyle : null;
		};

		render() {
			return (
				<React.Fragment>
					<ul>
						<li style={{ ...this.getStyle(), ...this.crossedOff() }}>
							{this.props.todo.title}
						</li>
					</ul>
				</React.Fragment>
			);
		}
	}


## React ternary 

truthy && truthy --> returns the last expression;

isValid && "something to return" returns the string "something to return" if isValid evaluates to truthy

	function Mailbox(props) {
		const unreadMessages = props.unreadMessages;
		return (
			<div>
				<h1>Hello!</h1>
				{unreadMessages.length > 0 &&
					<h2>
						You have {unreadMessages.length} unread messages.
					</h2>
				}
			</div>
		);
	}



		render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div>
				{isLoggedIn ? (
					<LogoutButton onClick={this.handleLogoutClick} />
				) : (
					<LoginButton onClick={this.handleLoginClick} />
				)}
			</div>
		);
	}


## Object Destructuring 

Take all the properties you want from props, and list them assign
	const { onReset, counters, onDelete, onIncrement } = this.props;
Then later use those properties directly instead of this.props.propertyName;
	<Counter
		key={counter.id}
		counter={counter}
		onDelete={onDelete}
		onIncrement={onIncrement}
	/>



# Basics

React is used to declare how the UI should look. React "reacts" to state changes.

Components are independant, isolated, and reusable pieces of UI (not entire pages)

Component names should be capital CamelCased and end with .JSX, rather than .JS

	import React, { Component } from 'react';

	export default class ClassName extends Component {

		<!-- Contains the data the component needs to display -->
		state = {
		imageUrl: "https://picsum.photos/200"
		}

		<!-- Declares what the UI should look like -->
		render() {

			<!-- use parenthesis for multi line expressions -->
			return (
				<React.Fragment>
				<img src={this.state.imageUrl} alt="random image" />
				</React.Fragment>
			);

		}
	}

`index.js` renders the app component, which is the root component, and affixes it to <div id="root"></div> of the index.html in the public folder. The App component contains the main child components, which in turn contain smaller grandchild components, etc.

index.js;

    import React from "react"
    import ReactDOM from "react-dom"

    // => example: ReactDOM.render(what to render, where to render it)
    ReactDOM.render(<appComponent/>, document.getElementById("root"))

## React.Fragment 

Wrap all html being rendered within <> ... </> for a virtual DOM wrapping instead of a div

# Components 

Functional component  //=> stateless (only uses props) More efficient than class components
	import React from "react"

	// => Display Logic goes here

	export const App = (props) => {
			return (
					<div>
							<h1>{props.whatever...}</h1>
					</div>
			)
	}

Class Component
	import React, { Component } from 'react';	

	// => State, Event, LifeCycle Logic goes here

	export default class App extends React.Component {
		render() {

			// => Display Logic goes here

			return (
				<div>
						<h1>{this.props.whatever...}</h1>
				</div>
			)
		}
	}

Example difference btw functional and class component;

	import React from "react";
	import todosData from "./db/todosData";
	import ToDoItem from "./components/TodoItem/TodoItem";

	// /////////////////////////////////////////////

	// Functional Way

	// const todosItems = todosData.map(item => (
	//   <ToDoItem key={item.id} text={item.text} completed={item.completed} />
	// ));

	// function App() {
	//   return <React.Fragment>{todosItems}</React.Fragment>;
	// }

	// /////////////////////////////////////////////

	class App extends React.Component {
		// /////////////////////////////////////////////

		// Old Class Way

		// constructor() {
		//   super();
		//   this.state = {
		//     todosList: todosData
		//   };
		// }

		// render() {

		//   const renderItems = this.state.todosList.map(item => (
		//     <ToDoItem key={item.id} text={item.text} completed={item.completed} />
		//   ));

		//   return <React.Fragment>{renderItems}</React.Fragment>;
		// }

		// /////////////////////////////////////////////

		// New Class Way

		state = {
			todosData: todosData
		};

		render() {
			const renderItems = this.state.todosData.map(item => (
				<ToDoItem key={item.id} text={item.text} completed={item.completed} />
			));

			return <React.Fragment>{renderItems}</React.Fragment>;
		}
	}

	// /////////////////////////////////////////////

	export default App;


# Props

Props are properties or attributes of JSX HTML elements. Once passed down, they become read only (this.props.etc should not be reassigned). Instead, consume passed props or assign them to variables. 

Props are passed from a parent component to a child component as <childComp prop1 = "..."/>
Then, in childComponent (assuming its a class component), access the passed property as `this.props.prop1`.
If a functional component, pass props as a property to the childComponent's function, and use props as `props.prop1`

example using functional component:

	import React from "react"
	import ContactCard from "./ContactCard"

	function App() {
			return (
					<div className="contacts">						
							<ContactCard 
									contact={{name: "Felix", imgUrl: "http://placekitten.com/200/100", phone: "(212) 555-4567", email: "thecat@hotmail.com"}}
							/>		
					</div>
			)
	}

	export default App

ContactCard Component: 

	import React from "react"

	function ContactCard(props) {
		return (
			<div className="contact-card">
					<img src={props.contact.imgUrl}/>
					<h3>{props.contact.name}</h3>
					<p>Phone: {props.contact.phone}</p>
					<p>Email: {props.contact.email}</p>
			</div>
			{props.children}  //=> ...other content
		)
	}

	export default ContactCard

using a class component 

import React from "react"

class ContactCard extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div className="contact-card">
					<img src={this.props.contact.imgUrl}/>
					<h3>{this.props.contact.name}</h3>
					<p>Phone: {this.props.contact.phone}</p>
					<p>Email: {this.props.contact.email}</p>
			</div>
			{this.props.children}  //=> ...other content
		)
	}
}


## Prop Types 

For validation of props, in class components, outside of the class, write;

className.propTypes = {
	name: React.PropTypes.string,
	age: React.PropTypes.number,
	user: React.PropTypes.object,
	children: React.PropTypes.element.isRequired   // if using props.children
}

## Rendering lists

	const todosData = [
		{
			id: 1,
			text: "Take out the trash",
			completed: true
		},
		...
		{
			id: 5,
			text: "Catch up on Arrested Development",
			completed: false
		}
	]

	export default todosData

	...


	import React from "react";
	import todosData from "./db/todosData";
	import ToDoItem from "./components/TodoItem/TodoItem";

	// For each item in the iterable you render, include a key as a prop
	// If each item is an object containing an id, use that. Otherwise, ise the index of iteration; Arr.map((item, i) => ... key={i}...)

	const todosItems = todosData.map(item => (
		<ToDoItem key={item.id} text={item.text} completed={item.completed} />
	));

	function App() {
		return <React.Fragment>{todosItems}</React.Fragment>;
	}

	export default App;


	...

	import React from "react";
	import "./TodoItem.css";

	const ToDoItem = props => {
		return (
			<div className="todo-item">
				<input type="checkbox" checked={props.completed} />
				<p>{props.text}</p>
			</div>
		);
	};

	export default ToDoItem;


## State 

While props are changed from outside the recieving component, state refers to changes triggered from inside the component
State is meant to be updated by a component, so don't set a child's props to state

	// import React, {Component} from "react"
	import React from "react"

	// class App extends Component {
	class App extends React.Component {
			constructor() {
					super()
					this.state = {
							answer: "Yes",
							age: 0
					}
			}
			
			render() {
				this.setState({
					age: this.state.age + 3
				})
					return (
							<div>
									<h1>Is state important to know? {this.state.answer}</h1>
									<ChildComponent answer={this.state.answer}/>
							</div>
					)
			}
	}

	export default App

Components need to be classed based to deal with state. They can then pass information down via props


## PrevState 

	import React from "react"

	export default class App extends React.Component {
			constructor() {
					super()
					this.state = {
							count: 0
					}
			}
			
			render() {
					
					const handleClick = () => {
							this.setState(prevState => {
									return {
											count: prevState.count + 1
									}
							})
					}
			
					return (
							<div>
									<h1>{this.state.count}</h1>
									<button onClick={handleClick}>Change!</button>
							</div>
					)
			}
	}

If using props to update state, use:
	this.setState((prevState, props) => ({
		counter: prevState.counter + props.increment
	}));

## Mapping through state properties 

	import React, { Component } from "react";
	import Counter from "./counter";

	class Counters extends Component {
		state = {
			counters: [
				{ id: 1, value: 0 },
				{ id: 2, value: 0 },
				{ id: 3, value: 0 },
				{ id: 4, value: 0 }
			]
		};

		handleDelete = () => {
			console.log("Event Handler Called");
		};

		render() {
			return (
				<React.Fragment>
					{/* <Counter />
					<Counter />
					<Counter />
					<Counter /> */}

					{/* Instead of hard coding <Counter /> multiple times, iterate of the state.counters array to render Counter components */}

					{this.state.counters.map(counter => (
						<Counter
							key={counter.id}
							onDelete={this.handleDelete}
							value={counter.value}
							id={counter.id}
						/>
					))}
				</React.Fragment>
			);
		}
	}

	export default Counters;


## Events
https://reactjs.org/docs/events.html#supported-events

Basic;

	import React from "react"

	const handleClick = () => {
			console.log("I was clicked")
	}

	export const Hello = () => {
			return (
					<div>
							<button onClick={handleClick}>Click me</button>
							//=> Alternative: <button onClick={() => console.log("I was clicked")}>Click me</button>
					</div>
			)
	}


	---

	class Toggle extends React.Component {
		constructor(props) {
			super(props);
			this.state = {isToggleOn: true};
		}

		handleClick = () => {
			this.setState(state => ({
				isToggleOn: !state.isToggleOn
			}));
		}

		render() {
			return (
				<>
				<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

				<button onClick={this.handleClick}>
					{this.state.isToggleOn ? 'ON' : 'OFF'}
				</button>
				</>
			);
		}
	}


The child raises the event, and the parent handles the event

In child;

	<button onClick={() => this.props.onDelete(this.props.id)} className="btn btn-danger btn-sm m-2">
		Delete
	</button>

In parent; 

		handleDelete = () => {
			console.log("counter id", counterId);
		};

	...

	render() {...
	return ()

		<Counter
			key={counter.id}
			onDelete={this.handleDelete}    //=> dont invoke the event here, just reference the event handling function
			value={counter.value}
			id={counter.id}
		/>


## Parent/Child communication

Its best for an end component to recieve data via props and raise events when data needs to be changed. Called controlled components, these dont have their own state.

You can reach out to a parent component from a child component by using a function reference, to execute something in the parent component

	class App extends React.Component {
		onGreet() {
			alert("Hello");
		}

		render() {
			return (
				<div>
					<Home greet={this.onGreet}/>
				</div>
			)
		}
	}

	...

	import React from "react"

	export const Home = (props) => {
			return (
					<div>
						<button onClick={props.greet}>Greet</button>
					</div>
			)
	}

## Lifting State Up, Reverse Data Flow
## Moving signal up component hierarchy via callback chain to send updated data back down
To pass data or state from child to grand parent, 

	// In Child 
	<input type="checkbox" onChange={() => this.props.markComplete(id)} />{" "}

	// In Parent 
	<Child key={todo.id} todo={todo} markComplete={this.props.markComplete} />

	// In Grand Parent : where state lives
	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map(todo => {
				// todo.id === id ? (todo.completed = !todo.completed) : null
				// todo.id === id && (todo.completed = !todo.completed)
				if (todo.id === id) todo.completed = !todo.completed

				return todo;
			})
		})
	}
	...
	<Parent todos={this.state.todos} markComplete={this.markComplete} />

	
## Reusable Components
When two parents render same child component, name the event to pass up the same in both parents;

child:
    <div className="card" onClick={props.handleClick}>
			...
    </div>

parent1:
      <Child
        key={...}
        handleClick={() => this.props.func1}
      />

parent2:
      <Child
        key={...}
        handleClick={() => this.props.func2}
      />

grandparent:

			<Parent1 func1={this.func1} />
			<Parent2 func2={this.func2} />

## Lifecycle Hooks, according to following order:
### These can only be written in class components
Mount - fires when components are initialized and inserted into the DOM

	1) constructor, 2) render, 3) componentDidMount

	ex: constructor(props) {
		super(props);
		this.state = this.props.something..
		// setState() can't be called yet
	}

	ex: render() {
		return (
			// return react elements which represent virtual DOM which renders to the DOM
			// Any children's render/return methods will also fire at this time, followed by any grandchildren, etc.
		)
	}

	ex: componentDidMount() {
		// After elements are in the DOM, make fetch requests here
		 ...
	}

Update - fires when state or props change

	1) render, 2) componentDidUpdate

	ex: componentDidUpdate(prevState, prevProps) {
		// fires if a component updates state/props compared to previously 
		if (prevProps.counter.value !== this.props.counter.value) {
			// To fetch to get new data from server
		}
	}

Unmount - fired when component is removed from DOM

	componentWillUnmount

	ex: componentWillUnmount() {
		// fires just before a component it removed from DOM
		// used to remove listeners, timers, etc
	}

	/*





## Forms 

Radio buttons: https://magnusbenoni.com/radio-buttons-react/

Use Formik Library, React Bootstrap, or Semantic Forms for React Forms and styling

	import React, { Component } from "react";

	export default class Form extends Component {
		state = {
			firstName: "",
			lastName: "",
			isFriendly: false,
			gender: "",
			favColor: ""
		};

		handleChange = event => {
			const { name, value, type, checked } = event.target;
			type === "checkbox"
				? this.setState({ [name]: checked })
				: this.setState({ [name]: value });
		};
		render() {
			return (
				<React.Fragment>
					{/* name properties must match with ones in state */}
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
						<br />
						<br />

						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							value={this.state.lastName}
							onChange={this.handleChange}
						/>

						<br />
						<br />
						<textarea value={"Some default value"} onChange={this.handleChange} />

						<br />
						<br />

						<label>
							<input
								type="checkbox"
								name="isFriendly"
								checked={this.state.isFriendly}
								onChange={this.handleChange}
							/>{" "}
							Is friendly?
						</label>

						<br />
						<br />
						<label>
							<input
								type="radio"
								name="gender"
								value="male"
								checked={this.state.gender === "male"}
								onChange={this.handleChange}
							/>{" "}
							Male
						</label>

						<br />
						<br />
						<label>
							<input
								type="radio"
								name="gender"
								value="female"
								checked={this.state.gender === "female"}
								onChange={this.handleChange}
							/>{" "}
							Female
						</label>

						<br />
						<br />
						<label>Favorite Color:</label>
						<select
							name="favColor"
							value={this.state.favColor}
							onChange={this.handleChange}
						>
							<option value="blue">Blue</option>
							<option value="green">Green</option>
							<option value="red">Red</option>
							<option value="orange">Orange</option>
							<option value="yellow">Yellow</option>
						</select>

						<h1>
							{this.state.firstName} {this.state.lastName}
						</h1>
						<h2>You are a {this.state.gender}</h2>
						<h2>Your favorite color is {this.state.favColor}</h2>

						<button>Submit</button>
					</form>
				</React.Fragment>
			);
		}
	}




## React Router
In App.js 
	import { BrowserRouter as Router, Route } from 'react-router-dom';

	...

	<Router>
		<div className='App'>
				<Header />

				<Route exact path="/" render={props => (
					<React.Fragment>
						<AddTodo addTodo={this.addTodo} />
						<Todos
							todos={this.state.todos}
							markComplete={this.markComplete}
							delTodo={this.delTodo}
						/>
					</React.Fragment>
				)} />
				<Route path="/about" component={About} />

		</div>
	</Router>


## Fetch()  

Using Axios;

GET Request 

	axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
		.then(res => this.setState({ todos: res.data }))

POST Request

	axios.post('https://jsonplaceholder.typicode.com/todos', {                                                
		title: title,
		completed: false
	})
		.then(res =>
			this.setState({
				todos: [
					...this.state.todos,
					res.data
				]
			})
		)

DELETE Request 

	axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
		.then(res => {
			this.setState({
				todos: this.state.todos.filter(todo => {
					return todo.id !== id
				})
			})
		})

