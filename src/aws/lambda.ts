import axios from "axios";

const methods = {
  async invokeLambda(service, funcName, payload, auth) {
    try {
      const options = {
        url: `https://services.impostograma.com.br/${service}-${process.env.stage}/${funcName}`,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        data: typeof payload == "string" ? JSON.parse(payload) : payload,
      };

      const response = await axios(options);

      return response;
    } catch (error) {
      console.log(error);

      return;
    }
  },
};

export const Lambda = () => {
  return methods;
};
