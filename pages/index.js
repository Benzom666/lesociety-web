import Head from "next/head";
import { connect, useSelector } from "react-redux";
import Login from "modules/auth/forms/login";

function Home({ dispatch }) {
  //   const user = useSelector((state) => state.authReducer.user);

  //   console.log('user', user)
  return (
    <React.Fragment>
      <Head>
        <title>Secret Time</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </React.Fragment>
  );
}

export default connect()(Home);
