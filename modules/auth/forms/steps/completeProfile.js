import React, { useEffect } from 'react';
import { apiRequest, showToast } from "../../../../utils/Utilities";
import { AUTHENTICATE_UPDATE } from '../../actionConstants';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';

const CompleteProfile = props => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleResendMail = async () => {
        if(user?.email) {
            try {
                const res = await apiRequest({
                    data: {
                    email: user.email
                    },
                    method: 'POST',
                    url: `user/verify-email`
                })
                showToast(res.data.message, 'success')
            } catch(err) {
                console.log('error', err)
            }
        }
    }

    useEffect(() => {
        const verifyEmail = async () => {
            if(router?.query?.token && router?.query?.email) {
                try {
                    const res = await apiRequest({
                        data: {
                            email: router?.query?.email,
                            token: router?.query?.token,
                        },
                        method: 'POST',
                        url: `user/email-verification`,
                    })
                    debugger
                    dispatch({
                        type: AUTHENTICATE_UPDATE,
                        payload: {email_verified: true}
                    })
                    dispatch({
                        type: AUTHENTICATE,
                        payload: res.data.data
                    });
                    showToast(res.data.message, 'success')
                } catch(err) {
                    console.log('error', err)
                }
            }
        }
        verifyEmail();
    }, [router?.query?.token])

    return (
        <div className="upload-pics profile-completion">
            <span className="completion-sign">
                <svg width="63" height="58" viewBox="0 0 63 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1465 23.7314C15.1465 23.7314 18.9298 27.2084 20.9717 29.5566C23.0135 31.9047 26.7968 37.1293 26.7968 37.1293C26.7968 37.1293 35.1907 24.7665 41.9423 18.4887C48.6939 12.2109 60.0003 6.25586 60.0003 6.25586" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect y="0.429688" width="57.0867" height="57.0867" rx="16" fill="#6DBE3E" />
                    <mask id="mask0_1502:3320" maskUnits="userSpaceOnUse" x="0" y="0" width="58" height="58">
                        <rect y="0.429688" width="57.0867" height="57.0867" rx="16" fill="white" />
                    </mask>
                    <g mask="url(#mask0_1502:3320)">
                        <path d="M16.3115 23.7314C16.3115 23.7314 20.0949 27.2084 22.1367 29.5566C24.1785 31.9047 27.9619 37.1293 27.9619 37.1293C27.9619 37.1293 36.3557 24.7665 43.1073 18.4887C49.8589 12.2109 61.1654 6.25586 61.1654 6.25586" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
            </span>
            <h2>
                {user?.email_verified ? 'Email Verified' : 'Profile Completed'}
            </h2>
            <p>
                {!user?.email_verified ? 
                'Please verify your email address, by clicking on the link in the email that was delivered to your inbox.'
                : 
                `You're one step away from meeting ${user?.gender === "male" ? 'beautiful ladies' : 'generous gents'}` }
            </p>
            {!user?.email_verified && 
            <span className="resend-mail-text profile" onClick={handleResendMail}>
            Resend an email
            </span>}
            <label className="text-label">
                Don’t wait any longer, start earning <br />
                now by posting your first date!
            </label>
            <div className="secret-input type-submit">
                <button onClick={() => user?.gender === "male" ? router.push('/user/user-list') : router.push("/create-date/choose-city")} className={`next ${!user?.email_verified ? 'disable' : ''}`} disabled={!user?.email_verified}>
                    {user?.gender === "male" ? 'GO TO GALLERY' : 'CREATE NEW DATE'}
                </button>
                {/* <a className="later-my-profile">Later, take me to My profile</a> */}
            </div>
        </div>
    )
}

export default CompleteProfile;