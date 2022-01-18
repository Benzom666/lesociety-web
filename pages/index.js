import Head from 'next/head'
import { connect } from "react-redux";
import Login from 'modules/auth/forms/login';

function Home ({dispatch} ) {
	return (
    <React.Fragment>
      	<Head>
        	<title>Secret Time</title>
        	<link rel="icon" href="/favicon.svg" />
      	</Head>
        
    </React.Fragment>
  )
}

export default connect()(Home);