import React, { useEffect,useState } from 'react'
import Header from 'core/header'
import Footer from 'core/footer'
import useWindowSize from "../../utils/useWindowSize";
import withAuth from '@/core/withAuth';
import { apiRequest } from 'utils/Utilities';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios'
import Image from "next/image";

const Notifications =  () => {
    const [notifData, setNotifData] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();

const user = useSelector((state) => state.authReducer.user);

const fetchNotifications = async() => {
    try {
        const params = {
        user_email: user.email,
        sort: 'sent_time'
    }
        // const params1 = new URLSearchParams();
        // params1.append('email',user.email)

        // const res1 = await apiRequest({
        //     method: "PUT",
        //     url: `notification/read-all-notification`,
        //     params: params1,
        // })
        // console.log("Read all notifications", res1)
        //setLoading(true)
        const {data} = await apiRequest({
        method: "GET",
        url: `notification`,
        params: params,
    });
        setNotifData(data?.data?.notification)
        setLoading(false)
        
    } catch (err) {
        console.log("err", err);
    }
}

const readNotifications = async() => {
    try {
        const params1 = new URLSearchParams();
        params1.append('email',user.email)
        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${user.token || ""}`,
            }
        }
        const url =  "https://staging-api.secrettime.com/api/v1/notification/read-all-notification"
    //     const params = {
    //     email: user.email,
    // }
    //     await apiRequest({
    //     method: "PUT",
    //     url: `notification/read-all-notification`,
    //     params: params1,
    // })
    const data = await axios.put(url, params1, config)
    console.log("Read all notifications ",data)
    } catch (err) {
        console.log("err here: ", err);
    }
}

    useEffect(() => {
        readNotifications()
        fetchNotifications()
        //readNotifications()
    },[])

    const getNotifTimeOrDate = (timestamp) => {
        let hr, min, days,ms
        ms = (Date.now() - new Date(timestamp))
        days = Math.floor(ms/ (1000 * 3600 * 24))
        if(!days){
            hr = Math.floor(ms/(1000 * 3600))
            min = Math.floor(ms/(1000 * 60))
            if(hr<24 && min>60) return hr + ' hrs'
            else if(min<60 && min>0) return min + ' mins'
            else return Math.floor(ms/(1000)) + ' secs' 
        }
        return days + ' days'
    }

    console.log("notif ", notifData)
    const { width } = useWindowSize();
    if(loading){
        return (
           
                <div className="date_details_desktop_loading-2">
                <Image
                    src={require("../../assets/squareLogoNoBack.gif")}
                    alt="loading..."
                    className=""
                    width={100}
                    height={100}
                />
                </div>
     
        )
    }
    else{
        return (
            <div className="notifications">
                <Header />
                    <div className={notifData[0] ? "notification-wrapper" : "notification-wrapper no-notifWrap"}>
                        <div className='main-header'>
                        <h1 className='header'> Notifications</h1>
                        </div>
                        {
                            notifData[0] ? <ul>
                            {
                                notifData?.map(notifs => 
                                    <li className='notif-items'>
                                        <p className='title'>Le Society</p>
                                        <p className='actions'>Action Required</p>
                                        <p className='msg'>{notifs.message}</p>
                                        <div className='notif-time'>
                                        <p className='timing'>{getNotifTimeOrDate(notifs.created_date)} ago</p>
                                        {
                                            notifs.type!== "notification" &&
                                            <div className='btn-container'>
                                                <button className='edit-btn-verify' 
                                                onClick={() => router.push({pathname: "/auth/profile", query: {edit: true,type: notifs.type, id: notifs._id }})}>
                                                Edit now
                                                </button>
                                        </div>
                                        }
            
                                        </div>
                                    </li>)
                            }
                            </ul>: <p className='no-notif'>You do not have any notifications at this time.</p>
                        }
                    </div>
                <Footer />
                </div>
            )
    }

}

export default withAuth(Notifications) ;