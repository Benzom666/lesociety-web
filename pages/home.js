import Head from "next/head";
import Link from "next/link";
import withAuth from "../core/withAuth";

function Home({ items }) {
  return (
    <>
      <div className="inner-part-page auth-section">
        <ul>ssdsa</ul>
      </div>
    </>
  );
}
export default withAuth(Home);
