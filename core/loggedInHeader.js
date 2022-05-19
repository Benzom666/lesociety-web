import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { CustomIcon } from 'core/icon';
import UserImg from 'assets/img/profile.png';
import SideBar from "./sidebar";
import useWindowSize from "utils/useWindowSize";
import { useSelector } from "react-redux";
import _ from 'lodash'
import { useRouter } from "next/router";

export default function HeaderLoggedIn({ fixed, isBlack }) {
    const [isActive, setActive] = useState(false);
    const width = useWindowSize();
    const router = useRouter()
    const user = useSelector(state => state.authReducer.user)

    const sidbarCloseOutsideClick = (event) => {
        const target = document.querySelector('#sidebar-header')
        const withinBoundaries = event.composedPath().includes(target)
        if (withinBoundaries) {
            setActive(false);
            document.body.classList.remove("open-sidebar");
        }
    }

    useEffect(() => {
        document.addEventListener('click', sidbarCloseOutsideClick)
    }, [])

    useEffect(() => {
        return () => {
            setActive(false);
            document.body.classList.remove("open-sidebar");
        }
    }, []);

    const toggleClass = () => {
        setActive(!isActive);
        document.body.classList.toggle("open-sidebar");
    };

    return (
        <header style={fixed ? { position: 'fixed', width: '100%', zIndex: '99' } : {}} className={`py-3 py-md-4 loggedin_user ${isBlack && 'is-black-head'}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 col-2">
                        <div className="logo">

                            <>
                                <h3 className="d-md-none mb-0 st-logo">ST</h3>
                                <Link href="/auth/login" >
                                    <img src="/images/logo.svg" width="159" alt="Logo" className="d-none d-md-block" />
                                </Link>
                            </>
                        </div>
                    </div>
                    <div className="col-md-8 col-10">
                        <nav>
                            <ul className="d-flex justify-content-end mb-0 align-items-center">
                                <li>
                                    <button id='message-icon' className="message_link" onClick={() => router.push('/messages')} type="button">
                                        <CustomIcon.Envelope color={'#fff'} size={20} />
                                        {width?.width > 767 &&
                                            <>
                                                <Link href="/messages"><a className="forgot-passwrd">Messages</a></Link>
                                                <span className="top-bages">3</span>
                                            </>
                                        }
                                    </button>
                                </li>
                                <li>
                                    <div className="user-profile-details">
                                        <figure className="user_img_header" onClick={toggleClass}>
                                            <img
                                                src={!_.isEmpty(user) ? user.images[0] : UserImg}
                                                alt="user image"
                                                width={32}
                                                height={32}
                                            />
                                        </figure>
                                    </div>
                                </li>
                            </ul>
                            <div id="sidebar-header" className={isActive ? 'sidebar-nav open_nav_menu' : 'sidebar-nav'}>
                                <SideBar />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
