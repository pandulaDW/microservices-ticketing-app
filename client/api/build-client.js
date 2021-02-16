import axios from "axios";

const buildClient = ({ req }) => {
  // check if env is server or client
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://nginx-ingress-controller.kube-system.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
