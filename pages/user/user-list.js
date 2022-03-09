import React, { useEffect } from 'react'
import HeaderLoggedIn from 'core/loggedInHeader'
import Footer from 'core/footer'
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCardList from '@/core/UserCardList';
import LocationPopup from '@/core/locationPopup';
import withAuth from "../../core/withAuth";
import { apiRequest, countriesCode} from 'utils/Utilities';
import { fetchLiveLocation } from "../../modules/auth/forms/steps/validateRealTime"
import { useSelector } from 'react-redux';

function UserList({ dispatch }) {
    const [dateId, setDateId] = React.useState('');
    const [dates, setDates] = React.useState([]);
    const [classPopup, setPopupClass] = React.useState('hide');
    const [textClass, setTextSlideClass] = React.useState('');
    const [locationPopup, setLocationPoup] = React.useState(false);
    const [selectedLocation, setLocation] = React.useState({});
    const user = useSelector(state => state.authReducer.user)
    const country = user?.country && countriesCode[user.country]

    const fetchDate = async (params) => {
        try {
            const res = await apiRequest({
                url: "date",
                params: params
            })
            setDates(res?.data?.data?.dates)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(selectedLocation?.city) {
            fetchDate({location: selectedLocation?.city}) 
        }
    }, [selectedLocation])

    useEffect(() => {
        setLocation({city: user.location, country: country})
    }, [user?.location])

    const closePopup = () => {
        setPopupClass('hide')
    }

    const openPopup = () => {
        setPopupClass('show')
        const icon = document.querySelector('.icon-move');
        const dummyIcon = document.querySelector('.icon-move-1');
        const dimension = dummyIcon.getBoundingClientRect();
        icon.style.left = dimension.left + 'px'
        icon.style.top = dimension.top - 310 + 'px'
    }

    function growDiv(id) {
        // setDateId(id)
        let growDiv = document.getElementById('message-popup');
        if (growDiv.style?.top) {
            growDiv.style.top = '100%';
        } else {
            growDiv.style.top = 'unset';
        }
    }

    const moveIcon = () => {
        setTextSlideClass('show');
        const element = document.querySelector('.icon-move');
        const target = document.getElementById('message-icon');
        if (target && element) {
            element.style.opacity = 1;
            const xT = target.offsetLeft;
            const yT = target.offsetTop;
            const xE = element.offsetLeft;
            const yE = element.offsetTop;
            // set elements position to their position for smooth animation
            element.style.left = xE + 'px';
            element.style.top = yE + 'px';
            // set their position to the target position
            // the animation is a simple css transition
            element.style.left = xT + 5 + 'px';
            element.style.top = yT + 5 + 'px';
            target.scrollIntoView();
        }
        setTimeout(() => {
        element.style.opacity = 0;
        closePopup();
        setTextSlideClass('');
        }, 1000)
    }

    return (
        <div className="inner-page" id="infiniteScroll">
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
                                            <div onClick={() => setLocationPoup(true)} className="selct-wrap-sort">
                                                <label><span style={{'margin-right': '5px'}} >{selectedLocation?.city}, {selectedLocation?.country?.toUpperCase()}</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <InfiniteScroll 
                                    scrollableTarget="infiniteScroll"
                                    dataLength={dates.length}
                                    next={() => console.log('first')}
                                    hasMore={true}
                                >
                                <div className="row">
                                {dates.length > 0 && dates.map((item, index) => 
                                    <div className="col-xl-6 col-lg-12">
                                        <UserCardList setDateId={setDateId} date={item} cardId={`grow-${index}`} openPopup={openPopup} closePopup={closePopup} growDiv={growDiv} dateId={dateId} />
                                    </div>
                                )}
                                </div>
                                </InfiniteScroll>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <svg onClick={moveIcon} className='icon-move' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6048 0.407386C13.2546 0.0480202 12.7364 -0.0858618 12.2532 0.0550622L0.9856 3.33166C0.47579 3.4733 0.114443 3.87988 0.0171013 4.39639C-0.0823407 4.92205 0.265006 5.58935 0.718788 5.86838L4.24193 8.03376C4.60328 8.25573 5.06967 8.20008 5.36869 7.89845L9.40303 3.83901C9.6061 3.62762 9.94224 3.62762 10.1454 3.83901C10.3484 4.04336 10.3484 4.37455 10.1454 4.58594L6.104 8.64612C5.80426 8.94698 5.74826 9.41556 5.96883 9.77914L8.12154 13.3377C8.37361 13.7604 8.80782 14 9.28396 14C9.34003 14 9.40303 14 9.4591 13.9929C10.0053 13.9225 10.4395 13.5491 10.6005 13.0206L13.9409 1.76735C14.088 1.2882 13.9549 0.766759 13.6048 0.407386Z" fill="#686868" />
            </svg>
            <div id="message-popup" className={`message-popup ${classPopup}`}>
                <span onClick={closePopup} className='close-button'>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9924 12.9926L1.00244 1.00006" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.9887 1.00534L1.00873 12.9853" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                <p className='msg'>“If you’re not amazed by the stars then we can’t hang”</p>
                <div>
                    <input className={`${textClass}`} placeholder="Type your message here…" />
                    <svg onClick={moveIcon} className='icon-move-1' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.6048 0.407386C13.2546 0.0480202 12.7364 -0.0858618 12.2532 0.0550622L0.9856 3.33166C0.47579 3.4733 0.114443 3.87988 0.0171013 4.39639C-0.0823407 4.92205 0.265006 5.58935 0.718788 5.86838L4.24193 8.03376C4.60328 8.25573 5.06967 8.20008 5.36869 7.89845L9.40303 3.83901C9.6061 3.62762 9.94224 3.62762 10.1454 3.83901C10.3484 4.04336 10.3484 4.37455 10.1454 4.58594L6.104 8.64612C5.80426 8.94698 5.74826 9.41556 5.96883 9.77914L8.12154 13.3377C8.37361 13.7604 8.80782 14 9.28396 14C9.34003 14 9.40303 14 9.4591 13.9929C10.0053 13.9225 10.4395 13.5491 10.6005 13.0206L13.9409 1.76735C14.088 1.2882 13.9549 0.766759 13.6048 0.407386Z" fill="#686868" />
                    </svg>
                </div>
                <p className='tip'>Tip: ask her which date she prefers</p>
            </div>
            <LocationPopup 
            modalIsOpen={locationPopup}
            closeModal={() => setLocationPoup(false)}
            selectedLocation={selectedLocation}
            setLocation={setLocation} />
        </div>
    )
}

export default withAuth(UserList);