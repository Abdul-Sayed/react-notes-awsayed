# SWR

Library for data fetching with lots of benefits such as data caching and optimistic rendering until updates are recieved, prevents duplicate requests. Good solution for keeping the front end in sync with the backend (managing serverside state)

    npm i swr

    import useSWR from "swr";

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR("https://api.github.com", fetcher);

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
      // use data as needed
    );
