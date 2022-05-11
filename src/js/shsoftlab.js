import axios from "axios";

const methods = {
  // eslint-disable-next-line no-unused-vars
  requestData: async (type, path, requestData) => {
    if (type == "get") {
      try {
        return await axios.get(path);
      } catch (error) {
        console.log(error);
      }
    } else if (type == "post") {
      // axios.post(path, requestData)
      // .then(response=>callback(response.data))
      // .catch((error) => {
      //     console.log(error);
      // });
      try {
        return await axios.post(path, requestData);
      } catch (error) {
        return error.response;
        //console.log("err : " + error);
      }
    } else if (type == "put") {
      //put
    }
  },
};

export default methods;
