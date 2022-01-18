import UserImg from 'assets/img/userimg.jpg';
import Image from 'next/image'
import { CustomIcon } from 'core/icon';

const UserCardDetail = (props) => {
    return (
            <div className="date_card_wrap">
                <figure className="user_img_date">
                    <Image
                        src={UserImg}
                        alt="user image"
                        width={500}
                        height={500}
                    />
                    <div className="user-details">
                        <h5>Anna, <span className="user_age">21</span></h5>
                        <div className="user_location">
                            <span className="d-flex align-items-start">
                                <span className="address-wrap">
                                    <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214355 5.46429C0.214355 6.36877 0.440493 7.26558 0.870389 8.06101L5.37983 16.2167C5.43986 16.3255 5.55425 16.3928 5.67864 16.3928C5.80303 16.3928 5.91743 16.3255 5.97746 16.2167L10.4886 8.05832C10.9168 7.26558 11.1429 6.36874 11.1429 5.46425C11.1429 2.45134 8.69159 0 5.67864 0C2.66569 0 0.214355 2.45134 0.214355 5.46429ZM2.94651 5.46429C2.94651 3.95781 4.17217 2.73216 5.67864 2.73216C7.18512 2.73216 8.41077 3.95781 8.41077 5.46429C8.41077 6.97076 7.18512 8.19641 5.67864 8.19641C4.17217 8.19641 2.94651 6.97076 2.94651 5.46429Z" fill="#F24462"/>
                                    </svg>
                                    <span className="address px-2">Toronto. ON</span>   
                                </span>
                                <span className="price_per_hour">
                                    $80 / <small>2hr</small>
                                </span>
                            </span>
                        </div>
                        <div className="tag_wrap">
                            <ul>
                                <li>
                                    <CustomIcon.Sporty color={'#fff'} size={20}/>
                                    <span>Get sporty</span>
                                </li>
                                <li>
                                    <CustomIcon.OutdoorAdventure color={'white'} size={20}/>
                                    <span>Adventure</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </figure>  
                <div className="date_details">
                    <h4>Date Details</h4>
                    <p>Let’s do something fun, I’m not picky so be adventurous. Must be day time activity only. I am usually starting my shift at 5 so we have to be done by 3 pm latest. Ciao!</p>
                </div>
            </div>     
    );
  }
  
  export default UserCardDetail
  
  
  
  