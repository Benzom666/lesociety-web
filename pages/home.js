import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import withAuth from "../core/withAuth";
import LeSlogoWhite from '../assets/LeS logoWhite.png'
function Home({ items }) {
  return (
    <>
      <div className="inner-part-page auth-section">
        <nav class="navbar navbar-dark bg-black">
          <div class="container-fluid">
            <a className="LeSociety-Icon-White" href="#">
              <div className="ls-logo">
              <Image src={LeSlogoWhite} alt="ls-logo" sizes={10} />
              </div>
              <div className="ls-text mt-4">
               <p> L E S O C I E T Y <br/>
                   Date outside Your League</p>
              </div>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
export default withAuth(Home);
