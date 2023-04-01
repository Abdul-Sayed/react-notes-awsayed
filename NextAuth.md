# NextAuth

---

## Setup with NextJS 13

    npm install next-auth

Add an API route in `pages/api/auth/[...nextauth].js`

    import NextAuth from "next-auth";
    import FacebookProvider from "next-auth/providers/facebook";
    export const authOptions = {
      // Configure one or more authentication providers
      providers: [
        FacebookProvider({
          clientId: process.env.Facebook_ID!,
          clientSecret: process.env.Facebook_SECRET!,
        }),
        // ...add more providers here
      ],
      pages: {
        signIn: "/auth/signin",
      },
      secret: process.env.NEXTAUTH_SECRET!,
    };
    export default NextAuth(authOptions);

Add your providers

---

**Wrap the application in a provider**

Create a file SessionProvider.tsx in components folder, adjacent to app folder

    "use client";

    import { Session } from "next-auth";
    import { SessionProvider as Provider } from "next-auth/react";

    type Props = {
      children: React.ReactNode;
      session: Session | null;
    };

    function SessionProvider({ children, session }: Props) {
      return <Provider>{children}</Provider>;
    }

    export default SessionProvider;

In layout.tsx;

    import "../styles/globals.css";
    import SideBar from "./../components/SideBar";
    import SessionProvider from "../components/SessionProvider";
    import { getServerSession } from "next-auth";
    import { authOptions } from "../pages/api/auth/[...nextauth]";

    export const metadata = {
      title: "ChatGPT",
      description: "Clone of OpenAI's ChatGPT assistant",
    };

    export default async function RootLayout({ children }: { children: React.ReactNode }) {
      const session = await getServerSession(authOptions);
      return (
        <html lang="en">
          <body>
            <SessionProvider session={session}>
              <div className="flex">
                <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                  <SideBar />
                </div>
                <div className="bg-[#343541] flex-1">{children}</div>
              </div>
            </SessionProvider>
          </body>
        </html>
      );
    }

Session is obtained in a serverside component with:

    import { getServerSession } from "next-auth";
    const session = await getServerSession(authOptions);

Session is obtained ina client side component with:

    import { useSession } from "next-auth/react";
    const { data: session, status } = useSession();

For Google:

In google console, on left, go to Build => Authentication.
Get Started, choose Google
Toggle enable, and set an email. Save
Hover over it and edit configuration. Click Web SDK configuration
Reveal Web Client ID and Web Client Secret -> paste those to env variables

---

`https://developers.facebook.com/`
Create a facebook developer account, create a new app, choose consumer, facebook login, Web, enter any site url (can be changed later to the deployed site url). Click next, and then on settings on the left. When you have your deployed site url, add it to Valid OAuth Redirect URIs. Then settings Gear -> Basics. The App ID is the Facebook_ID and the App Secret is the Facebook_Secret. Paste those into your environment variables. As for the NEXTAUTH_SECRET, generate one from https://generate-secret.vercel.app/32

In app/auth/signin/page.tsx;

    import { getProviders } from "next-auth/react";
    import Image from "next/image";
    import SignInComponent from "./SignInComponent";

    async function SignInPage() {
      const providers = await getProviders();

      return (
        <div>
          <div>
            <Image
              className="rounded-full mx-2 object-cover"
              width={700}
              height={700}
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/yvbOx5two0W.png"
              alt="Profile Pucture"
            />
          </div>
          <SignInComponent providers={providers} />
        </div>
      );
    }

    export default SignInPage;

In SignInComponent;

    "use client";

    import { getProviders } from "next-auth/react";
    import { signIn } from "next-auth/react";

    type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
    };

    export default function SignInComponent({ providers }: Props) {
      return (
        <div className="flex justify-center">
          {Object.values(providers!).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      );
    }

Wrap the app in a provider  
Create a providers.tsx on the same level as layout;

    "use client";

    import { SessionProvider } from "next-auth/react";

    export default function Providers({ session, children }: any) {
      return <SessionProvider session={session}>{children}</SessionProvider>;
    }

In layout.tsx;

    import "../styles/globals.css";
    import Header from "./Header";
    import Providers from "./providers";
    import { getServerSession } from "next-auth/next";

    export default async function RootLayout({ children }: { children: React.ReactNode }) {
      const session = await getServerSession();
      return (
        <html lang="en">
          <head />
          <body>
            <Header />
            <Providers session={session}>{children}</Providers>
          </body>
        </html>
      );
    }

In page.tsx;

    import ChatInput from "./ChatInput";
    import { getServerSession } from "next-auth/next";

    const Home = async () => {

      const session = await getServerSession();

      return (
        <main>
          <ChatInput session={session} />
        </main>
      );
    };

    export default Home;

In ChatInput.tsx;

    import { getServerSession } from "next-auth/next";

    type Props = {
    session: Awaited<ReturnType<typeof getServerSession>>;
    };

    function ChatInput({ session }: Props) {
      ... use session
    }

---

## Setup

example uses google as the auth provider

In pages/api/auth create a dynamic file path called [...nextauth].js

    import NextAuth from "next-auth";
    import GoogleProvider from "next-auth/providers/google";

    export default NextAuth({
      providers: [
        // OAuth authentication providers...
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
      ],
    });

In .env.local file, add the keys

    GOOGLE_ID=key_goes_here
    GOOGLE_SECRET=key_goes_here
    NEXTAUTH_URL=http://localhost:3000

    HOST=http://localhost:3000

    In https://console.cloud.google.com/apis/credentials/oauthclient/

Find APIs & Services, Credentials, and in Authorized Redirect URIs, add
`http://localhost:3000/api/auth/callback/google`

## Deployment

In Vercel, add environment variables

    `NEXTAUTH_URL=https://production_domain_of_app`
    `NEXTAUTH_SECRET=Some_Secret_Generated_At_https://generate-secret.vercel.app/32`
    `GOOGLE_ID=key_goes_here`
    `GOOGLE_SECRET=key_goes_here`

In https://console.cloud.google.com/apis/credentials/oauthclient/

Find APIs & Services, Credentials, and in Authorized Redirect URIs, add
`https://amozon.vercel.app/api/auth/callback/google`

Replace https://amozon.vercel.app with app domain url in vercel

In Authorized Javascript Origins, add:
`https://amozon.vercel.app/` , replacing with your deployed vercel app domain

=======
Provides Authentication solutions for Nextjs applications

Designed to work with popular sign in services

    npm install next-auth

In \_app.js give the entire application access to NextAuth's authentication state;

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
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=...

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
