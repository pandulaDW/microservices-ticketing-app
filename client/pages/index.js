import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page Mate</h1>;
};

LandingPage.getInitialProps = async () => {
  // check if env is server or client
  if (typeof window === "undefined") {
    const response = await axios.get(
      "http://nginx-ingress-controller.kube-system.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );
    return response.data;
  } else {
    const response = await axios.get("/api/users/currentuser");
    return response.data;
  }
};

export default LandingPage;
