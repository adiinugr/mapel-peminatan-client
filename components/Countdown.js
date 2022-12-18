import React,{useEffect,useState} from 'react'
import Countdown from 'react-countdown';

const itemContainerClassname = `text-center text-md p-2 xl:bg-secondary rounded-md text-white`
  const paragraphValueClassname = `font-medium`
  const paragraphPlaceholderClassname = `text-sm`

const Completionist = () => <span>You are good to go!</span>;

 const countdownRenderer = ({ formatted }) => (

    // <span suppressHydrationWarning={true}>
    //  {formatted.hours}: {formatted.hours}:{formatted.minutes}:{formatted.seconds}
    // </span>

    <div  className="grid grid-cols-4 xl:grid-cols-1 xl:gap-2 items-center justify-between xl:top-10 xl:left-6 xl:fixed mb-10 xl:mb-0">
        <div className={itemContainerClassname}>
          <p suppressHydrationWarning={true} className={paragraphValueClassname}>{formatted.days}</p>
          <p className={paragraphPlaceholderClassname}>Days</p>
        </div>
        <div className={itemContainerClassname}>
          <p suppressHydrationWarning={true} className={paragraphValueClassname}>{formatted.hours}</p>
          <p className={paragraphPlaceholderClassname}>Hours</p>
        </div>
        <div className={itemContainerClassname}>
          <p suppressHydrationWarning={true} className={paragraphValueClassname}>{formatted.minutes}</p>
          <p className={paragraphPlaceholderClassname}>Mins</p>
        </div>
        <div className={itemContainerClassname}>
          <p suppressHydrationWarning={true} className={paragraphValueClassname}>{formatted.seconds}</p>
          <p className={paragraphPlaceholderClassname}>Seconds</p>
        </div>
      </div>
  )

function CountdownComponent({deadlineDate}) {

  return (

      <Countdown
    date={Date.parse(deadlineDate)}
    renderer={countdownRenderer}
  />
    

   
  )
}

export default CountdownComponent