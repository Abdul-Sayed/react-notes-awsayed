# Typescript with React

Create your type file;

    export type Message = {
      text: string;
      createdAt: admin.firestore.Timestamp;
      user: {
        _id: string;
        name: string;
        avatar: string;
      };
    };

Case prop data to the type

    import Message from "./Message";

    type Props = {
      message: Message;
    };
    function MessageList({ message }: Props) {
      ...
    }

    export default MessageList;

You can replace `type` with `interface`

Typing useState data; pass a generig type to the useState method

    const[country, setCountry] = useState<string>("");

Enums; store multiple values in an object

    enum HairColor = {
      Blonde = "Good for you",
      Brown = "Nice hair",
      Pink = {Wow, so cool"}
    }

    HairColor.Blonde // "Good for you"

Creating types for Context state;

Example UserContext.tsx

    import {createContext, useState, FC, ReactNode} from 'react';

    interface UserContextType {
      username: string;
    }

    const UserContext = createContext<UserContextType | null>(null);

    const UserProvider: : FC<ReactNode> = ({children}) => {

      const [currentUser, setCurrentUser] = useState<UserContextType>({
        username: "filiptammergard",
      });

        return (
            <UserContext.Provider value={currentUser}>
                {children}
            </UserContext.Provider>
        )
    }

    export default UserProvider;

In App.tsx, provide the application with the context;

    import UserProvider from './UserContext';
    ...
        <React.StrictMode>
            <Router>
                <UserProvider>
                    <Route path="/" component={App} />
                </UserProvider>
            </Router>
      </React.StrictMode>

To use the context;

    import { useContext } from "react";

    const MyComponent = () => {
      const currentUser = useContext(UserContext);

      return <p>Name: {currentUser?.username}.</p>;
    };
