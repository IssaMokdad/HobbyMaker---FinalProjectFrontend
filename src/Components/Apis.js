//Declaring this server ip as it will be used across all apis
export const api = "http://localhost:8000/"


var accessToken
//Creating this fetch request that will be used to fetch data in all the application except for form data type
export const fetchRequest = (url, method, data = null) => {
  accessToken = localStorage.getItem('token');
  if (method === "get") {
    return fetch(url, {
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Authorization': "Bearer "+accessToken,
        
      },
    }).then((response) => response.json());
  } else {
    return fetch(url, {
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Authorization': "Bearer "+accessToken,
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
};
//declaring this token to use it in form data fetch


