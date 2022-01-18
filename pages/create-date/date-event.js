import  Createdates   from 'modules/date/Createdates';
import Header from 'core/header'
import Footer from 'core/footer'
import useWindowSize from "/utils/useWindowSize";
 
function Step1 ({dispatch} ) {
  const { width } = useWindowSize();
	return (
    <div className="inner-page">
      <Header />
        <div className="inner-part-page">
          <div className="auth-section create-date-wrap">
              <Createdates />
           </div>
        </div>
      <Footer />
    </div>
  )
}

export default Step1 ;