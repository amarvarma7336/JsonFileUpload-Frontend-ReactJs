import * as axios from "axios";

function getJsonData() {
  return new Promise((resolve, reject) => {
    let uri = `http://localhost:8080/get-json-data`;

    axios
      .get(uri)
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

export { getJsonData };
