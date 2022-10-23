# React Notes

## CLI

npx create-react-app my-app  
cd my-app  
npx generate-react-cli component NewComponent  
npm start  

Boilerplate for react functional components
rfc
rafce

## Styling

### SCSS

run `npm install sass` and rename your files to scss
Add global styling like google font imports in your index.scss or global.scss file.

### Mixins

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

### style encapsulation

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

## Inline Styles

     <header style={{
        backgroundColor: 'blue',
        color: '#fff'
     }}>
        ...
     </header>

## Dynamic Styling

        style={ {textDecoration: completed ? 'line-through' : 'none' } }
        style={ completed ? { textDecoration: 'line-through' } : {textDecoration: 'none' } }

## Event Handling

        const handleClick1 = () => {
            console.log('clicked')
        }
        const handleClick2 = (e) => {
            console.log(e, 'clicked')
        }
        const handleClick3 = (name) => {
            console.log(`${name} was clicked`)
        }
        const handleClick4 = (event, name) => {
            console.log(`${event.target} was clicked by ${name}`)
        }
        ...
        <button onClick={handleClick1}>Click It</button>
        <button onClick={handleClick2}>Click It</button>
        <button onClick={ () => handleClick3('Dave' ) }>Click It</button>
        <button onClick={ (event) => handleClick4(event, 'Dave' ) }>Click It</button>

With handleClick1/2, e is passed automatically

## Props

Properties are passed to a child component from a parent, and then accessed in the child;

In App.js  

    <Box on={square.on} />

Then in the child, the props are accessed

    export  default  function Box(props) {

        const styles = {backgroundColor: props.on ?  "#222222"  :  "transparent"}

        return (
            <div
                style={styles}
                className="box">
            </div>
        )
    }

### Destructured Props

In App.js  

    <Box on={square.on} />

In Child

    export  default  function Box({on}) {

        const styles = {backgroundColor: on ?  "#222222"  :  "transparent"}
        return (...)
    }

**Default props** are used incase the parent fails to pass a property;

    function CatComponent(props) {
        return <div>
                {props.catName || "Sandy"},
                Eye Color: {props.eyeColor || "deepblue"},
                Age: {props.age || "120"}
        </div>
    }

Or

    function CatComponent(props) {
        return <div>
                {props.catName},
                Eye Color: {props.eyeColor},
                Age: {props.age}
        </div>
    }
    CatComponent.defaultProps = {
        catName: "Sandy",
        eyeColor: "deepblue",
        age: "120"
    }

## State

The `useState` hook is used to allow functional components to be stateful.

    [count, setCount] = useState(0)

count is initialized to 0.
To update count, use the setCount method;

    setCount(42)
    setCount(prevCount => prevCount + 1)

Use the second approach if new count relies on previous count.

It is not recommended for a child component to set its state from incoming props.
Instead, the child component should only render its props and the parent should maintain state, and pass any state changes as props down to the child.

Lazy State Initialization

If the initial value of state requires computing something resource intensive, return it in an anonymous function;

    const [notes, setNotes] = React.useState( () => (JSON.parse(localStorage.getItem("notes")) || []) )

## Lifting State Up

Create an event handler function in the parent and pass a reference to it as props to the child. When the event fires, the child should pass data to that prop function.

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
                <button type="submit">Submit</button>
            </form>
        )
    }

## Effects

Used for side-effect producing code, such as api calls, use the effects Hook. Its first parameter is an anonymous function, and its second parameter is an array of the slices of state that deal with side effects. useEffect fires after the dom is painted.

If you omit the 2nd paramenter, the effect's function will run at each repaint of the dom, leading to memory leaks.
If you pass an [] as the 2nd argument, the function will run once when the component loads.
If you pass a slice of state as the 2nd argument, the function will run on first render and then only when that part of state changes.

The useEffect function is asynchronous and runs after everything in the component finishes running

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

To make an api call:

    const API_url = 'http://localhost:3500/items';

    const [items, setItems] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not recieve expected data');
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch(err) {
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        (async () => await fetchItems()) ();
    }, [])

 With axios,
 
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data)
            }  catch(err) {   // 500 error
                if (err.response) {
                    console.log(err.response.headers);
                    console.log(err.response.status);
                    console.log(err.response.data);   
                } else {  // 400 error
                    console.log(`Error`: ${err.message}`);
                }
            }
        }
        fetchPosts();
    }, [])

Other crud operations:

    const response = await api.post('/posts', newPost)
    setPosts([...posts, newPost])

    const response = await api.put(`/posts/`${id}, updatedPost)
    setPosts(posts.map(post => post.id === id ? {updatedPost} : post))

    await api.delete(`/posts/${id}`)
    setPosts([posts.filter(post => post.id !== id)])

Plain fetch without async syntax

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
        .then(res => {
            if (!res.ok) {  // 400 error jumps to catch block
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {  // 500 errors
            setError(err.message);
            setIsPending(false);
        })
    }, [])

If you want to run an effect only once (on mount and unmount), and immedietly clean it up you can pass an empty array ([]) as a second argument. This is good for bulky code that you want to run only once on component mount, and not on each re-render.

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

## React Router

    npm i react-router-dom

index.js

    import {BrowserRouter as Router, Route} from "react-router-dom";

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </React.StrictMode>
    );

in App.js


    import { Route, Switch, useHistory } from "react-router-dom";
    // import all nested components

    import { Route, Switch } from "react-router-dom";


    function App() {
      return (
        <>
          <Header />
          <Nav />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/post"><NewPost /></Route>
            <Route path="/post/:id"><PostPage /></Route>
            <Route path="/about" component={About} />  // alt syntax
            <Route path="*" component={Missing} />
          </Switch>
          <Footer />
        </>
      );
    }

Child components can nest routes in the same way

To link to a page, such as in nav component;

    import {Link} from 'react-router-dom';

    <ul>
    <li><Link to="/">Home</li>
    <li><Link to="/post">Posts</li>
    <li><Link to={`/post/${post.id}`}>{post.title}</li>
    <li><Link to="/about">About</li>
    </ul>

To use a route parameter, such as :id in PostPage component;

    import {useParams} from 'react-router-dom';

    const {id} = useParams();  // id was the parameter used in the routing


To get the current path;

    import {useRouteMatch} from 'react-router-dom';

    const {path} = useRouteMatch();

To redirect to another page

    import {Redirect} from 'react-router-dom';

    <Redirect from="home" to="dashboard" />

Redirect from code  
Push a new page onto the router stack with useHistory

    import {useHistory} from 'react';

    const history = useHistory();

    history.go(-1);  // go back a page
    history.go(1);  // go forward a page
    history.push('/');  // go back to home page
## Custom Hooks

Reusable logic/utility functions that can be used in other components. Hook files are like functional components without render. Like angular services.

        import { useState, useEffect } from "react";

        const useWindowSize = () => {
          const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
          });

          useEffect(() => {
            const handleResize = () => {
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
              });
            };
            handleResize();

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
          }, []);

          return windowSize;
        };

        export default useWindowSize;

 Use the hook in another file;

        import useWindowSize from "./hooks/useWindowSize";

        const { width, height } = useWindowSize();

Custom Axios Hook:

    import { useState, useEffect } from "react";
    import axios from "axios";

    const useAxiosFetch = (dataUrl) => {
        const [data, setData] = useState([]);
        const [fetchError, setFetchError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            let isMounted = true;
            const source = axios.CancelToken.source();

            const fetchData = async (url) => {
                setIsLoading(true);
                try {
                    const response = await axios.get(url, {
                        cancelToken: source.token,
                    });
                    if (isMounted) {
                        setData(response.data);
                        setFetchError(null);
                    }
                } catch (err) {
                    if (isMounted) {
                        setFetchError(err.message);
                        setData([]);
                    }
                } finally {
                    isMounted && setIsLoading(false);
                }
            };

            fetchData(dataUrl);

            const cleanUp = () => {
                isMounted = false;
                source.cancel();
            };
            return cleanUp;
        }, [dataUrl]);

        return { data, fetchError, isLoading };
    };

    export default useAxiosFetch;

To use it;

    import useAxiosFetch from "./hooks/useAxiosFetch";

    const {data: posts, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts");

    useEffect(() => {
        ...
    }, [posts]);


Plain Fetch Custom Hook

    import { useState, useEffect } from "react";

    const useFetch = (url) => {
        const [data, setData] = useState([]);
        const [fetchError, setFetchError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        
        useEffect(() => {
            const abortContr = new AbortController();

            fetch('http://localhost:8000/blogs', {signal: abortContr.signal})
            .then(res => {
                if (!res.ok) {  // 400 error jumps to catch block
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {  // 500 errors
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setIsPending(false);
                }
            })

            return () => abortContr.abort();  // abort the fetch if component unmounts
        }, [url])
        return { data, fetchError, isLoading };
    }

    export default useFetch;



## Context

Create a context file in a context folder for each seperate part of state
The context file must provide each prop that the components need.
Parent components don't pass props to children, instead, just route to children.
In a child, don't recieve props, instead read the state from context.

Example CartContext.js

    import {createContext} from 'react';

    const CartContext = createContext();

    export function CartProvider({children}) {

        const [items, setItems] = useState([]);
        const addToCart = (name, price) => {
            setItems(prevItems => [...prevItems, {name, price}])
        }

        return (
            <CartContext.Provider value={{items, addToCart}}>
                {children}
            </CartContext.Provider>
        )
    }

    export default CartContext;

CartContext provides items and addToCart state.

In index.js, provide the application with the context;

    import {CartProvider} from './CartContext';
    ...
        <React.StrictMode>
            <Router>
                <CartProvider>
                    <Route path="/" component={App} />
                </CartProvider>
            </Router>
      </React.StrictMode>

Actually, a context should only be provided to the components that need it, no higher.  
So don't provide a context to a whole app if there will be components that don't use it.  
Select the right parent component to provide a relevant context to its children.  
Other parts of the app can do something similar with a different context.  

To use the state,

    import {useContext} from 'react';
    import CartContext from '../cartContext';
    ...
    const {item, addToCart} = useContext(CartContext);


## useReducer

Alternative way to manipulate component state, besides useState. Replaces need for many useState variables, and their associated setter functions.
Replaces all setter functions with a switch statement.

Create a reduer and action file  
PostReducer.js;

    import { ACTION_TYPES } from "./postActionTypes";

    export const INITIAL_STATE = {
        loading: false,
        post: {},
        error: false,
    };

    export const postReducer = (state, action) => {
        switch (action.type) {
            case ACTION_TYPES.FETCH_START:
            return {
                ...state,
                loading: true,
            };
            case ACTION_TYPES.FETCH_SUCCESS:
            return {
                ...state,
                post: action.payload,
            };
            case ACTION_TYPES.FETCH_ERROR:
            return {
                ...state,
                error: true,
            };
            default:
            return state;
        }
    };

PostActionTypes.js;

    export const ACTION_TYPES = {
        FETCH_START: "FETCH_START",
        FETCH_SUCCESS: "FETCH_SUCCESS",
        FETCH_ERROR: "FETCH_ERROR",
    };

Post.js;

    import { useReducer } from "react";
    import { INITIAL_STATE, postReducer } from "./postReducer";
    import { ACTION_TYPES } from "./postActionTypes";

    const Post = () => {
        const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

        const handleFetch = () => {
            dispatch({ type: ACTION_TYPES.FETCH_START });
            fetch("https://jsonplaceholder.typicode.com/psts/1"
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
            })
            .catch((err) => {
                dispatch({ type: ACTION_TYPES.FETCH_ERROR });
            });
        };

        return (
            <div>
                <button onClick={handleFetch}>{state.loading ? "Wait..." : "Fetch the post"}</button>
                <p>{state.post?.title}</p>
                <span>{state.error && "Something went wrong!"}</span>
            </div>
        );
    };

    export default Post;
