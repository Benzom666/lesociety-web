import React from 'react';
import useWindowSize from "../../../../../utils/useWindowSize";


const CompleteProfile = props => {
    const { width } = useWindowSize();

    return (
        <div className="upload-pics profile-completion">
            <span className="completion-sign">
                <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" className='success_svg'>
                    <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <path class="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z" />
                        <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
                    </g>
                </svg>
            </span>
            <h2>
                Profile Completed
            </h2>
            <p>
                Please verify your email address, by clicking on the link in the email that was delivered to your inbox.
                {/* 
{/* 
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