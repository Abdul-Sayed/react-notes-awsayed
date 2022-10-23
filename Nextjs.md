## Overview

Framework that allows serverside rendering and static site generation for performance improvements, better SEO

Serverside Rendering: The application is rendered in the server and sent already rendered to the browser.

Client Side Rendering: Server sends client minified HTML, which the browser uses to render the application.

Next.js serverside renders and delivers the initial page, and then lazy loads the remaining pages using a preload strategy so that they are ready by the time the user visits them.

    npx create-next-app appName

## File Directory

The components live in the pages folder. Each page is a react component as well as a route; 
pages/about.js is <About /> and https://localhost3000/about route. Pages/index.js is the root path.

For nested routes, create folders inside the pages directory; 
pages/test/index.js has https://localhost3000/test route 
and pages/test/about.js has https://localhost3000/test/about route.  

For components that are not routed to, add them to a components folder. Import and add those components in pages/index.js

## Page title and SEO meta data

    import Head from 'next/head';

    <Head>
        <title>Ninja App | Home</tile>
        <meta name="keywords" content="Blog about Ninjas"/>
    </Head>

## Styling

Styles include a global css file, and css modules for style encapsulation.  
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

To designate a route that's linked to dynamically, surround its name in brackets; [id].js  

Link to it by concatenating the id parameter;

    <Link href=`/items/${item.id}`>About</Link>

## wildcard component

In pages folder, create a 404.js  
This component will be rendered incase an invalid route is visited

## Layout

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
                {children}  //  <Component {...pageProps} /> from _app.js
            <Footer />
            </>
        );
    };


## Data Fetching

Data is fetched in the server before the broswer recieves anything.  
Normally fetching occurs from the browser within useEffect, but in Next, it occurs in the getStaticProps method which runs before the component is rendered, waits for the data, and renders the component with the available data.

    export const getStaticProps = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();

        return {
            props: {ninjas: data}
        }
    }

    const Ninjas = ({ninjas}) => {
        return (
            ...
        )
    }

    export default Ninjas;


## Build / Deploy

    npm run build

Check server/pages for all the generated pages


Go to vercel.com, sighup with Github  
Ensure there's a repo for your project on Github  
In vercel, inport the repo from your github, and deploy
