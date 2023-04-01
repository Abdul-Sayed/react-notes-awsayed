# Firebase

## Installation

    npm i firebase
    npm i react-firebase-hooks

## Integration with NextAuth;

Go to firebase console, Go to console, add project

In google console, on left, go to Build => Authentication.
Get Started, choose Google
Toggle enable, and set an email. Save
Hover over it and edit configuration. Click Web SDK configuration
Reveal Web Client ID and Web Client Secret -> paste those to env variables
These are the id and secret for GoogleProvider in NextAuth

## Whitelist the redirect URI in firebase; both development and production urls;

Go to `https://console.cloud.google.com/`
Select project, go to navigation menu -> APIs and Services -> Credentials
Click on the correct OAuth 2.0 Client ID (the one with matching google client id) and in
Authorized JavaScript origins, add URI; `http://localhost:3000`
Or your deployed vercel app domain: `https://chat-gpt-nine-tau.vercel.app`
Authorized redirect URIs, the redirect_uri = `http://localhost:3000/api/auth/callback/google`
Or your deployed vercel app: `https://chat-gpt-nine-tau.vercel.app/api/auth/callback/google`
If its a nextjs project, you can get the redirect uri from the getPoviders method or from the error that appears when you attempt to signin without adding the redirect on firebase.

When you deploy to vercel, get the redirect uri as the domain name (globe icon); `https://chat-gpt-nine-tau.vercel.app`
So redirect_uri = `https://chat-gpt-nine-tau.vercel.app/api/auth/callback/google`

## Firestore

In console.firebase.google.com, select your project
On left panel, select Build -> Firestore Database. Click Create database
Click on the Project Overview cog, Project Settings -> your apps
Choose </>, Register app. Then copy the Firebase config code

Then create a firebase.ts file in your project root;

    import { getApp, getApps, initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "...",
      authDomain: "chat-gpt-8f34d.firebaseapp.com",
      projectId: "chat-gpt-8f34d",
      storageBucket: "chat-gpt-8f34d.appspot.com",
      messagingSenderId: "...",
      appId: "...",
    };

    // Initialize Firebase singleton
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

    // Get the Firebase db
    const db = getFirestore(app);

    export { db };

Add data to Firestore in a client component;

    import { addDoc, collection, serverTimestamp } from "firebase/firestore";
    import { useSession } from "next-auth/react";
    import { db } from "../firebase";

    function NewChat() {
      const { data: session } = useSession();

      const createNewChat = async () => {
        // users holds a list of user emails
        // an email maps t many chats
        // any of the chats hold hashes with the doc id key and the message object value
        const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
          userId: session?.user?.email!,
          createdAt: serverTimestamp(),
        });
      };
    }

Maintain a live connection to read data from firestore db (in a client component);

`npm i react-firebase-hooks`

    import { getFirestore, collection } from "firebase/firestore";
    import { useCollection } from "react-firebase-hooks/firestore";

    import { db } from "../firebase";
    import ChatRow from "./ChatRow";

    function SideBar() {
      // Get a list of the chat messages
      const [chats, loading, error] = useCollection(
        session && collection(db, "users", session.user?.email!, "chats")
      );

      return (
        <section className="flex flex-col h-screen p-2">
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
        </section>
      );
    }

    export default SideBar;

## Firebase Admin

Used to make permissionless changes to the db from the backend

`npm i firebase-admin`

Generate new Private key:  
Go to `https://console.firebase.google.com/` and access your project, or create a new database.
Click on the Project Overview cog, Project Settings, service accounts tab, and copy the nodeJS code.
Generate new private key. Download the file and paste it into `https://www.textfixer.com/tools/remove-line-breaks.php`.
Copy the minified file and paste it into your env file; Firebase_Service_Account_Key = ....

Create a firebaseAdmin.ts in root directory;

    import { getApps } from "firebase-admin/app";

    const serviceAccount = JSON.parse(process.env.Firebase_Service_Account_Key as string);

    if (!getApps().length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    const adminDb = admin.firestore();

    export { adminDb };

Write to Firebase DB:

    import admin from "firebase-admin";
    import { adminDb } from "../../firebaseAdmin";

      const message: Message = {
        text: response || "ChatGPT was unable to find an answer for that",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
          _id: "ChatGPT",
          name: "ChatGPT",
          avatar: "https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png",
        },
      };

      await adminDb
        .collection("users")
        .doc(session?.user?.email)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message);

## Firebase functions

The firebase functions are usually deployed seperately from the UI

    npm i -g firebase-tools

    git init
    firebase login
    firebase init
    // Choose functions, use an existing project --> choose your project on firebase
    cd into functions folder, and run `npm run serve`
