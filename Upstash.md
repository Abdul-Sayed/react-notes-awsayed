Upstash holds a redis database and allows a connection to it.

Create an account at upstash.com and create a database.

Connect to the database
`npm i ioredis`
Create a redis.js file to use the same instance of the connection to redis throughout the app

    import Redis from "ioredis";
    let redis = new Redis(process.env.UPSTASH_URL!);
    export default redis;

The upstash url is "rediss://default:**\*\*\*\***@usw1-large-wasp-33394.upstash.io:33394", with your upstash password from the upstash dashboard replacing the asteriks. Login to upstash and find it in the Details tab.
