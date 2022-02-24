import HeaderLoggedIn from 'core/loggedInHeader'
import Footer from 'core/footer'
import UserCardList from '@/core/UserCardList';
import LocationPopup from '@/core/locationPopup';
import withAuth from "../../core/withAuth";
 
function UserList ({dispatch} ) {
	return (
    <div className="inner-page">
      <HeaderLoggedIn />
        <div className="inner-part-page">
            <div className="pt-5 pb-4">
                <div className="container user_list_wrap">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex align-items-center justify-content-center justify-content-md-between pb-3">
                                        <span className="hidden-sm">Nearby</span>
                                        <div className="selct-wrap-sort">
                                            <select  id="select-location">
                                                <option>Toronto,ON</option>
                                                <option>Nexaty,ON</option>
                                                <option>Zoronyo,ON</option>
                                                <option>Toronto,ON</option>
                                                <option>Yokyoro,ON</option>
                                            </select>
                                            <label htmlFor="#select-location"></label>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-12">
                                    <UserCardList />
                                </div>
                                <div className="col-xl-6 col-lg-12">
                                    <UserCardList />
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col-xl-6 col-lg-12">
                                    <UserCardList />
                                </div>
                                <div className="col-xl-6 col-lg-12">
                                    <UserCardList />
                                </div>
                            </div>   
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>    
        </div>
      <Footer />
      <LocationPopup />
    </div>
  )
}

export default withAuth(UserList);