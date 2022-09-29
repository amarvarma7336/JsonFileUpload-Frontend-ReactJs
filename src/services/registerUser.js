import * as axios from "axios";

function registerUser(payload) {
  return new Promise((resolve, reject) => {
    let uri = `http://localhost:8080/create-user`;

    axios
      .post(uri, payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
          reject(errors.response.data.errors);
        }
        reject(errors);
      });
  });
}

export { registerUser };
