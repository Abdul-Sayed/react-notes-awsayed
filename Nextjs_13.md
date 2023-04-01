# NextJS 13

## Configuration

In nextconfig.js;

    /** @type {import('next').NextConfig} */
    module.exports = {
      reactStrictMode: true,
      experimental: {
        appDir: true
      }
    }

Create an app directory at the root level

## File and Folder structure

The `/app` directory embraces Server Components – React components that render on the server and send plain HTML over the wire.

The app folder has a page.js file which serves as the index (base path). In addition, the app folder has a layout.js, loading.js, error.js files. The layout file renders the components that make up the permanent layout of the page, as well as page.js as the children.

Sub folders in the app directory map to paths in the navigation. Each folder has its own page.js file which is the index to that path, as well as layout, loading, and error files.

- page.tsx for the page

Page components are always server components. NextJS renders on the server, caches the result, and returns.

- layout.tsx for the static layout

Layout components tell NextJS what to always render around your page. When you nest subdirectories to make complex routes, their layouts also nest.

- loading.tsx for the loading state

The loading component renders while waiting for the page component's promise to resolve.

## Api Routes

Nextjs api files run on the server as serveless functions; get run only when called, and then the server is freed up after running. So an advantage is that there is no dedicated server running when you don't need it. Advantages are lower cost and ease of scalability. Disadvantages are slower startup times, esp from a cold start, and higher latency. The latency issue can be reduced with Vercel's edge functions where rather than your code running on a central server, instances of it are distrubed across servers, and the client is connected to the closest server to them.
