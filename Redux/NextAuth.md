# NextAuth

Provides Authentication solutions for Nextjs applications

Designed to work with popular sign in services

    npm install next-auth

In _app.js give the entire application access to NextAuth's authentication state;

    import { SessionProvider } from "next-auth/react";

    const MyApp = ({ Component, pageProps }) => {
      return (
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      );
    };

    export default MyApp;

Create a pages/api/auth/[...nextauth].js file;

    import NextAuth from "next-auth";
    import GoogleProvider from "next-auth/providers/google";
    import GithubProvider from "next-auth/providers/github";

    export default NextAuth({
      providers: [
        // OAuth authentication providers...
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ],
      secret: process.env.NEXTAUTH_SECRET,
    });

  In .env file, add `NEXTAUTH_URL=http://localhost:3000`, and in vercel environment variables, add `NEXTAUTH_URL=https://amozon.vercel.app`, replacing with your project domain.

  Go to https://generate-secret.vercel.app/32 to generate a next wuth secret key. In ,env, add this to NEXTAUTH_SECRET. And do the same in vercel.


With each OAuth provider, you'll need to register to get an ID and Secret Key.

For google,

    npm install firebase

For the Google keys, go to Firebase.com, login, go to console, add a project, click cog on top left -> project settings -> click on code icon -> Register app -> continue to console -> click on Config option -> copy the config object.
In root level of project, add firebase.js file, and paste in the object, and `import firebase from 'firebase'; at the top.

Back in firebase.com, click on Authentication from the left panel -> Get Started -> Sign in method -> Google -> enable -> add your email and save. -> Go back -> Click on google -> Web SDK configuration -> copy the web client ID and the Web Client Secret into your .env file as GOOGLE_ID and GOOGLE_SECRET

Visit https://console.cloud.google.com/, click on your project -> Quick access API's and Services -> Credentials -> OAuth 2.0 Cliend IDs -> Authorized redirect URIs add `http://localhost:3000/api/auth/callback/google` and `https://amozon.vercel.app/api/auth/callback/google`, replace `https://amozon.vercel.app` with your vercel domain.

In Authorized JavaScript origins -> add `http://localhost:3000`, and `https://amozon.vercel.app`, replacing the latter with your vercel project domain

This assumes your server your project locally in port 3000


In .env.local;

    GOOGLE_ID=...
    GOOGLE_SECRET=...

Also provide them to Vercel;

To sign in, in a component;

    import { useSession, signIn, signOut } from "next-auth/react";

    const { data, status } = useSession();

    <p>Hello {data.user.name}</p>

    status === "authenticated" ? ...

    <div onClick={signIn}>
    <div onClick={signOut}>


The steps to add Github as a provider are similar

In [...nextauth].js

    import NextAuth from "next-auth";
    import GoogleProvider from "next-auth/providers/google";
    import GithubProvider from "next-auth/providers/github";

    export default NextAuth({
      providers: [
        // OAuth authentication providers...
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ],
      secret: process.env.NEXTAUTH_SECRET,
    });

Get the Github id and secret by signing into github -> settings -> developer settings from scrooling down on the left -> OAuth Apps -> New OAuth app -> Add `http://localhost:3000` as Homepage url, and Authorized callback url as http://localhost:3000/api/auth/callback/github, but when done developing, make sure to replace the domain with vercel; https://amozon.vercel.app/api/auth/callback/github. Register and get Client ID and Client secret -> paste them into .env.local and add them to environment variables in vercel.




