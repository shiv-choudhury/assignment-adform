import axios from "axios";

const BaseUrl = "https://jsonplaceholder.typicode.com/";

export const getHeader = async (token) => {
  const authToken = token || localStorage.getItem("token");

  return {
    "Content-Type": "application/json"
    // Authorization: `Bearer ${authToken}`
  };
};

export const getResponse = async (url, params = {}, token = null) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      method: "GET",
      params: { ...params },
      headers: await getHeader(token)
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error?.response?.data?.message === "invalidToken") {
          localStorage.removeItem("token");
        }
        reject(error);
      });
  });
};

export const postResponse = async (url, payload = {}, token = null) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      method: "POST",
      data: { ...payload },
      headers: await getHeader(token)
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
