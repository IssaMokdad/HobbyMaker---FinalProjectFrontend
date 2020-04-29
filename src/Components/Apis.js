export const fetchRequest = (url, method, data = null) => {
  if (method === "get") {
    return fetch(url).then((response) => response.json());
  } else {
    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
};
