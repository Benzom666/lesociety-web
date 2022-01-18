import React, { useState} from "react";
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { deAuthenticateAction } from '../modules/auth/authActions'
import { useRouter } from 'next/router'
import _ from 'lodash'

export default function Header() {
const user = useSelector(state => state.authReducer.user)
const dispatch = useDispatch();
const router = useRouter()
  return (
    <header className="py-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className="logo">
                        <Link href="/auth/login">
                             <img src="/images/logo.svg" width="159" alt="Logo" />
                        </Link>     
                    </div>
                </div>
                <div className="col-md-8 ">
                    <nav>
                        <ul className="d-flex justify-content-end mb-0">
                            {!_.isEmpty(user) ? 
                                <li>
                                    <a href="javascript:void(0)" onClick={()=> {
                                            dispatch(deAuthenticateAction())
                                            router.push('/auth/login')
                                        }}
                                    >
                                        Sign Out
                                    </a>
                                </li>
                                :
                                <>
                                    <li>
                                        <Link href="/auth/registration">
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/login">
                                            Sign In
                                        </Link>
                                    </li>
                                </>
                            }
                             
                        </ul>
                    </nav>
                </div>
            </div>
        </div>  
    </header>
  )
}
