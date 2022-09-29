import * as axios from "axios";

function login(payload) {
  return new Promise((resolve, reject) => {
    let uri = `http://localhost:8080/login`;
   
    axios
      .post(uri, payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
          reject(errors.response.data.message);
        }
        reject(errors);
      });
  });
}

export { login };