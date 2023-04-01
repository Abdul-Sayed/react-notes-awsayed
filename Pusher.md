Pusher allows for websocket connections that publish events to subscribers

Create an account at pusher.com
Choose Channels

In your terminal, `npm install pusher pusher-js`

Create a pusher.ts file;

    import Pusher from "pusher";
    import ClientPusher from "pusher-js";

    export const serverPusher = new Pusher({
      appId: "1564957",
      key: "80a9914b7341078cdce6",
      secret: "...",
      cluster: "us3",
      useTLS: true,
    });

    export const clientPusher = new ClientPusher("...", {
      cluster: "us3",
      forceTLS: true,
    });

In your serverside file, publish events

    import { serverPusher } from "../../pusher";
    // ping Pusher to let all subscribers know a message has been sent
    // Publish to the channel called "messages", emit the event called "new-message", pass the payload of newMEssage
    serverPusher.trigger("messages", "new-message", newMessage);

In your client file, subscribe to events

    import { clientPusher } from "../pusher";
    // Subscribe to pusher on the client
    useEffect(() => {
      channel.bind("new-message", async (pushedMessage: messageType) => {
        // update store with [pushedMessage, ...messages!]
      });
      // ensure cleanup is done
      return () => {
        channel.unbind_all();
        channel.unsubscribe();''
      };
    }, [messages, clientPusher]);
