import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </div>
  );
};

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  const pageProps = data;

  return { pageProps };
};

export default App;
