export const fetchRequest = (url, method, data = null) => {
  let token = localStorage.getItem('token');
  if (method === "get") {
    return fetch(url, {
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token,
        
      },
    }).then((response) => response.json());
  } else {
    return fetch(url, {
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Authorization': "Bearer "+token,
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
};
