## CLI

npx create-react-app my-app
cd my-app
npx generate-react-cli component NewComponent
npm start

## Styling

**SCSS**
run `npm install sass` and rename your files to scss
Add global styling like google font imports in your index.scss or global.scss file.

**style encapsulation**
use css modules. Example:
rename header.css file to header.module.scss

    import styles from "./header.module.scss";

    <ul className={`${styles["menu-items"]} ${styles["red"]}`}>...</ul>



    <main className={classes["main"]}>

    	<section className={classes["header"]}>

    		<h1 className={classes["header__title"]}>Laura Smith</h1>

    		<h6 className={classes["header__subtitle"]}>Frontend Developer</h6>

    		<p className={classes["header__contact"]}>laurasmith.website</p>

    	</section>

    </main>

    .main {

    	font-family: "Inter";
    	font-style: normal;
    	width: 317px;

    	.header {

    		&__title {
    			font-weight: 700;
    			font-size: 25px;
    		}
    		&__subtitle {
    			font-weight: 400;
    			font-size: 12.8px;
    		}
    		&__contact {
    			font-weight: 400;
    			font-size: 10.24px;
    		}
    	}

    }

All styles in header.module.scss are scoped locally to Header.js component.
Note the import syntax changed from import "./header.module.scss";
Note the template literal syntax for adding multiple classes

**Mixins**

In the shared folder, create a scss file for shared variables; as colors.scss or breakpoints.scss;

    $chubb-red: red;

    @mixin tablet {
    	@media only screen and (min-width: 768px) {
    		@content;
    	}
    }

    @mixin desktop {
    	@media only screen and (min-width: 992px) {
    		@content;
    	}
    }

Then import it into your component scss file;

    @use '../styles/colors.scss' as color;
    @use '../styles/breakpoints.scss' as breakpoints;



    .warning {
    	color: color.$chubb-red;
    }

    .container {
    	width: 60%;
    	@include breakpoints.tablet {
    		width: 100%;
    	}
    }

## Props

Properties are passed to a child component from a parent, and then accessed in the child;
In App.js

<Box on={square.on} />
Then in the child, the props are accessed

    export  default  function Box(props) {

    	const styles = {
    		backgroundColor: props.on ?  "#222222"  :  "transparent"
    	}

    	return (
    		<div
    			style={styles}
    			className="box">
    		</div>
    	)
    }

## State

The `useState` hook is not used to allow functional components to be stateful.

    count, setCount] = useState(0)

count is initialized to 0.
To update count, use the setCount method;

    setCount(42)
    setCount(prevCount => prevCount + 1)

Use the second approach if new count relies on previous count.

It is not recommended for a child component to set its state from incoming props.
Instead, the child component should only render its props and the parent should maintain state, and pass any state changes as props down to the child.

**Lazy State Initialization**

If the initial value of state requires computing something resource intensive, return it in an anonymous function;

    const [notes, setNotes] = React.useState(() => (JSON.parse(localStorage.getItem("notes")) || []))

## Lifting State Up

    export  default  function App() {
        const [squares, setSquares] = React.useState(boxes)

        function toggle(id) {
            setSquares(prevSquares => {
                return prevSquares.map((square) => {
                return square.id === id ? {...square,  on:  !square.on} : square
                })
            })
        }

        const squareElements = squares.map(square => (
        <Box
            key={square.id}
            on={square.on}
            toggle={() => toggle(square.id)}
        />
        ))

        return (
        <main>
            {squareElements}
        </main>
        )

    }

## Forms

    import React from "react"

    export default function Form() {
        const [formData, setFormData] = React.useState(
            {
                firstName: "",
                lastName: "",
                email: "",
                comments: "",
                isFriendly: true,
                employment: "",
                favColor: ""
            }
        )

        function handleChange(event) {
            const {name, value, type, checked} = event.target
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: type === "checkbox" ? checked : value
                }
            })
        }

        function handleSubmit(event) {
            event.preventDefault()
            // submitToApi(formData)
            console.log(formData)
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    name="firstName"
                    value={formData.firstName}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="lastName"
                    value={formData.lastName}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                />
                <textarea
                    value={formData.comments}
                    placeholder="Comments"
                    onChange={handleChange}
                    name="comments"
                />
                <input
                    type="checkbox"
                    id="isFriendly"
                    checked={formData.isFriendly}
                    onChange={handleChange}
                    name="isFriendly"
                />
                <label htmlFor="isFriendly">Are you friendly?</label>
                <br />
                <br />

                <fieldset>
                    <legend>Current employment status</legend>
                    <input
                        type="radio"
                        id="unemployed"
                        name="employment"
                        value="unemployed"
                        checked={formData.employment === "unemployed"}
                        onChange={handleChange}
                    />
                    <label htmlFor="unemployed">Unemployed</label>
                    <br />

                    <input
                        type="radio"
                        id="part-time"
                        name="employment"
                        value="part-time"
                        checked={formData.employment === "part-time"}
                        onChange={handleChange}
                    />
                    <label htmlFor="part-time">Part-time</label>
                    <br />

                    <input
                        type="radio"
                        id="full-time"
                        name="employment"
                        value="full-time"
                        checked={formData.employment === "full-time"}
                        onChange={handleChange}
                    />
                    <label htmlFor="full-time">Full-time</label>
                    <br />
                </fieldset>
                <br />

                <label htmlFor="favColor">What is your favorite color?</label>
                <br />
                <select
                    id="favColor"
                    value={formData.favColor}
                    onChange={handleChange}
                    name="favColor"
                >
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="indigo">Indigo</option>
                    <option value="violet">Violet</option>
                </select>
                <br />
                <br />
                <button>Submit</button>
            </form>
        )
    }

## Effects

Used for side-effect producing code, such as api calls, use the effects Hook. Its first parameter is an anonymous function, and its
second parameter is an array of the slices of state that deal with side effects. useEffect fired after the dom is painted.

ex:

        import React from "react"

        export default function App() {
            const [count, setCount] = React.useState(0)

            React.useEffect(() => {console.log("Effect function ran")}, [count])

            return (
                <div>
                    <h2>The count is {count}</h2>
                    <button onClick={() => setCount(prevCount => prevCount + 1)}>Add</button>
                </div>
            )
        }

If you want to run an effect only once (on mount and unmount), and immedietly clean it up you can pass an empty array ([]) as a second argument.

useEffect always runs on the first render. If the 2nd arg is [], it runs on the first render and when component unmounts.
If the 2nd arg is an array of slices of state, useEffect runs when each of those state slices change.

1. What is a "side effect" in React? What are some examples?

- Any code that affects an outside system.
- local storage, API, websockets, two states to keep in sync

2. What is NOT a "side effect" in React? Examples?

- Anything that React is in charge of.
- Maintaining state, keeping the UI in sync with the data,
  render DOM elements

3. When does React run your useEffect function? When does it NOT run
   the effect function?

- As soon as the component loads (first render)
- On every re-render of the component (assuming no dependencies array)
- Will NOT run the effect when the values of the dependencies in the
  array stay the same between renders

4. How would you explain what the "dependecies array" is?

- Second paramter to the useEffect function
- A way for React to know whether it should re-run the effect function

To prevent memory leaks, useEffect should also be used to do cleanup work like unsubscribe from websockets or any other cleanup when a component unmounts.

for cleanup, return a function in the first argument;

        export default function WindowTracker() {

            const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

            React.useEffect(() => {
                function watchWidth() {
                    setWindowWidth(window.innerWidth)
                }

                window.addEventListener("resize", watchWidth)

                return function() {
                    window.removeEventListener("resize", watchWidth)
                }
            }, [])

            return (
                <h1>Window width: {windowWidth}</h1>
            )
        }

If you want to use async await syntax, write

        React.useEffect(() => {
            async function getMemes() {
                const res = await fetch("https://api.imgflip.com/get_memes")
                const data = await res.json()
                setAllMemes(data.data.memes)
            }
            getMemes()
        }, [])
