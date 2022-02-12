//sending data to the server
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });

    return await res.json();
};

//getting data from the server
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export { postData };
export { getResource };
