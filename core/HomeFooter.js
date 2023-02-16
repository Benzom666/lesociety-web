import Link from 'next/link'
import Image from 'next/image'
import LeSlogoWhite from '../assets/LeS logoWhite.png'
import MaskGroup2 from '../assets/img/Mask Group 2.png'
import MaskGroup3 from '../assets/img/Mask Group 3.png'
import MaskGroup4 from '../assets/img/Mask Group 4.png'
import MaskGroup5 from '../assets/img/Mask Group 5.png'
import MaskGroup6 from '../assets/img/Mask Group 6.png'
export default function Footer(props) {
    console.log(props)
  return (
    <footer className='d-flex home-footer-main'style={props.styleBackground}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mx-0 home-footer">
            <div className='ls-logo-footer'>
               <div className='ls-logo mb-0' style={{width:"45px",margin:"auto"}}>
                  <Image src={LeSlogoWhite} alt="ls-logo-footer" sizes={10}/>
                  </div>
                   <p style={{color:"white",paddingTop:"10px",letterSpacing:"5.2px"}}>LE SOCIETY</p>
             </div>
             <div className='footer-icon-box'>
                <div className='footer-icon'>
                 <img src={MaskGroup2.src} alt='twitter-img'/>
                 <img src={MaskGroup4.src} alt='inst-img'/>
                 <img src={MaskGroup5.src} alt='yoytube-img'/>
                 <img src={MaskGroup6.src} alt='whtasap-img'/>
                 <img src={MaskGroup3.src} alt='fb-img'/>
                </div>
                <div className='footer-text'>
                   <div className='footer-text-1 mb-2 mt-3'>
                    <span>FAQ | Safety Tips | Terms | Privacy Settings | Our Story</span>
                   </div>
                   <div className='footer-text-2 mb-2 mt-3'>
                    <span>© 2022 Le Society | All Rights Reserved</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
    </footer>
  )
}
