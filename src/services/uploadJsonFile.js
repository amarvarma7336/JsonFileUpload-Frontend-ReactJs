import * as axios from "axios";

function uploadJsonFile(payload) {
  return new Promise((resolve, reject) => {
    let uri = `http://localhost:8080/upload-json-file`;

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

export { uploadJsonFile };
