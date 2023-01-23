import React from 'react'
import MaskGroup28 from '../assets/img/Mask Group 28.png';
import MaskGroup16 from '../assets/img/Mask Group 16.png';
import MaskGroup18 from '../assets/img/Mask Group 18.png';
import MaskGroup17 from '../assets/img/Mask Group 17.png';
import MaskGroup19 from '../assets/img/Mask Group 19.png';
import MaskGroup20 from '../assets/img/Mask Group 20.png';
import MaskGroup21 from '../assets/img/Mask Group 21.png';



export function HowItWorkMain({title,image,content}) {
  return (
    <div className='col-xl-6 col-lg-6 col-md-6 mt-5'> 
       <div className='howitWork-image'>
        <img src={image} style={{width:"100%"}} alt="howitWork-image"/>
       </div>
       <h3 className='howitWork-heading'>{title} </h3>
       <p  className='howitWork-content'> {content}</p>
    </div>
  )
}


export const contentObject =[
    {
        heading :"Morning Date",
        content :"Whether it’s grabbing an early-morning coffee from your favourite artisanal coffee shop, or going for a scenic stroll in one of your charming neighbourhoods, this option is for making the most out of your exciting new date earlier in the day.",
        imgUrl:MaskGroup28,
    },
    {
       heading :"Evening Date" ,
       content :"From enjoying a crisp glass of wine at a cozy patio nearby as the sun sets, to visiting a local bistro, or even try out a local festival together to discover new cultures or cuisines, our evening option is for experiences you can look forward to enjoying at the end of a long day.",
       imgUrl :MaskGroup16
    },
    {
        heading :"Take a class" ,
        content :"Learn something new as a duo, whether it’s picking up sensual salsa moves at a Latin dance class or a culinary class with incredible chefs who can show you how to make a fantastic food. This option is great to learn new things together and to make the date memorable.",
        imgUrl :MaskGroup18
     },
     {
        heading :"Get Sporty" ,
        content :"Show off your athletic skills with a one-on-one experience doing something you love, such as tennis, rock climbing, jogging or riding bikes throughout the city.",
        imgUrl :MaskGroup17
     },
     {
        heading :"Entertainment & Sports" ,
        content :"See your favourite celebrity performing on the big stage, head to a Broadway show, or even attend a basketball, football, or baseball game with your next date for the most memorable one-of-a-kind experience.",
        imgUrl :MaskGroup19
     },
     {
        heading :"Wine & Dine" ,
        content :"Enjoy a relaxing experience with flavourful food and tasty wine parings in a restaurant that provides excellent customer service. From steak and red wine to lobster and white wine, wining and dining is the perfect way to spend your evening after a long day.",
        imgUrl :MaskGroup20
     },
     {
        heading :"Bottles & Dance" ,
        content :"Make the most of the night with a trip to the hottest lounges or clubs around - VIP style. Where you can dance the night away, enjoy a few good drinks, and have the time of your life with your date.",
        imgUrl :MaskGroup21
     },
     
]

