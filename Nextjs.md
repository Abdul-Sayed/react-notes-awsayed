## Overview

Next.js is a framework that allows serverside rendering and static site generation for performance improvements, better SEO

Old Way: Server uses a template engine to deliver a formatted html page to the client. Navigating to each page in the site, or updating the ui on the current page requires a new request from the server.

Client Side Rendering: Server sends client minified HTML, which the browser uses to render a single page application, via javascript. No support for SEO.

Serverside Rendering: The application is rendered in the server and sent already rendered to the browser.

Next.js serverside renders and delivers the initial page, and then lazy loads the remaining pages using a preload strategy so that they are ready by the time the user visits them. Features file based routing, no need for react-router. Supports typescript and SCSS.

    npx create-next-app appName

    npm run dev

## File Directory

The components live in the pages folder. Each page is a react component as well as a route;
pages/about.js is `<About />` and `https://localhost3000/about` route. Pages/index.js is the root path.

For nested routes, create folders inside the pages directory;
`pages/test/index.js` has <https://localhost3000/test> route
and `pages/test/about.js` has <https://localhost3000/test/about> route.  

For components that are not routed to, add them to a components folder. Import and add those components in pages/index.js. Use uppercase for component names, and lowercase for page names.

## Layout

Pages/_app.js wraps all the page compoenents. Static layout content like footers and navbars are added here. Those would come from the components folder.

To have components that appear in each view, such as a navbar and footer;

pages/_app.js:

    import Layout from "../components/Layout";

    function MyApp({ Component, pageProps }) {
        return (
            <Layout>
                <Component {...pageProps} />  // all the pages of the app are rendered here
            </Layout>
        );
    }

    export default MyApp;

components/Layout.js:

    import Navbar from "./Navbar";
    import Footer from "./Footer";

    export const Layout = ({ children }) => {
        return (
            <>
                <Navbar />
                <main>
                    {children}  // where all routed pages will output
                </main>
                <Footer />
            </>
        );
    };

## Page title and SEO meta data

In each page;

    import Head from 'next/head';

    <>
    <Head>
        <title>Ninja App | Home</tile>
        <meta name="keywords" content="Blog about Ninjas"/>
    </Head>
    // rest of jsx here
    </>

## Styling

Styles include a global css file, and css modules for style encapsulation.  

pages/index.js is the Home page. Styles/Home.module.css affects it.

In the styles folder, name css files like so: Home.module.css

In a component, import those styles as:

    import styles from '../styles/Home.module.css';

Use the styles;

    <div className={styles.container}> ... </div>

Where .container is a css class in Home.module.css  
The selectors can only be css classes. Not html elements


## Assets/images

Add them to the public folder. Use a relative route to access;

    import Image from 'next/image';

    <Image src='/logo.png' width="128" height="77" />

## Routing

Use the link component;

    import Link from 'next/link';

    <Link href="/about">About</Link>

Programmatic navigation

    import {useRouter} from 'next/router';

    const router = useRouter();

    router.push('/home');
    router.go(1) // go forward or backward in page history
    router.go(-1)

Dynamic Routing

To designate a route that's linked to dynamically, create a folder, surrounding its name in brackets; [id]

Link to it by concatenating the id parameter;

    <Link href=`/items/${item.id}`>...</Link>

In pages/[id]/index.js, retrieve the id

    import {useRouter} from 'next/router';

    const router = useRouter();
    const {id} = router.query;


## wildcard component

In pages folder, create a 404.js  
This component will be rendered incase an invalid route is visited

## Data Fetching

Data is fetched in the server before the broswer recieves anything.  
Normally fetching occurs from the browser within useEffect, but in Next, it occurs in the getStaticProps method which runs before the component is rendered, waits for the data, and renders the component with the available data.

getStaticProps: fetches at build time

    export const getStaticProps = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();

        return {
            props: {users: data}
        }
    }

Pass the users data as props to the component needing the data

    const Users = ({users}) => {
        return (
            ...
        )
    }

    export default Users;

getServerSideProps: Fetches on every request. Slower

    export const getServerSideProps = async (context) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${context.params.id}`);
        const data = await res.json();

        return {
            props: {user: data}
        }
    }

Pass the user data as props to the component needing the data

    const User = ({user}) => {
        return (
            ...
        )
    }

    export default User;

getStaticPaths: Dynamically generate paths based on the fetched data. Fetched at build time. Faster

    export const getStaticPaths = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await res.json();

        const ids = data.map(obj => obj.id);
        const paths = ids.map(id => ({
                params: {id: id.toString()}
            }))
        return {
            paths,
            fallback: false
        }
    }

Pass the ids as props to the component needing the data

    const User = ({paths}) => {
        return (
            ...
        )
    }

    export default User;

## Build / Deploy

    npm run build

Check server/pages for all the generated pages

Go to vercel.com, sighup with Github  
Ensure there's a repo for your project on Github  
In vercel, inport the repo from your github, and deploy

## Build a static site

In package.json, in scripts, add `"export": "next export"`

The out folder will have the static site with everything pre fetched. So the site will work very fast.
