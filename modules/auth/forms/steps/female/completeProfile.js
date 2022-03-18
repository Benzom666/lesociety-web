import React from 'react';
import useWindowSize from "../../../../../utils/useWindowSize";


const CompleteProfile = props => {
    const { width } = useWindowSize();

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
                Profile Completed
            </h2>
            <p>
                Please verify your email address, by clicking on the link in the email that was delivered to your inbox.
{/* 
                You're one step away from <span> meeting generous gents</span> */}
            </p>
            {/* <label className="text-label">
                Don’t wait any longer, start earning <br />
                now by posting your first date!
            </label> */}
            <div className="secret-input type-submit">
                <a href="/create-date/choose-city" className="next disable">
                    CREATE NEW DATE
                </a>
                {/* <a className="later-my-profile">Later, take me to My profile</a> */}
            </div>
        </div>
    )
}

export default CompleteProfile;