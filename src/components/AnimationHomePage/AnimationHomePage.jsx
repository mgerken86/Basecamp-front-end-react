import MovingText from 'react-moving-text'
import { useState } from 'react'


// const animationsForChaining = ["slideInFromLeft", "slideOutToRight", "slideInFromRight", "slideOutToLeft", "flipFromTop", "flipToBottom", "popIn", "zoomOut"]
// const animationsForChaining = ["slideInFromLeft", "flipToBottom", "slideInFromRight", "flipToBottom", "slideInFromTop", "flipToBottom", "popIn", "zoomOut"]
const animationsForChaining = ["slideInFromLeft", "flipToBottom", "slideInFromRight", "flipToBottom", "slideInFromTop", "flipToBottom", "popIn", "zoomOut"]
// each word gets 2, because each gets 2 animations per word
const animatedTextArr = ['RENTALS', 'RENTALS', 'EVENTS', 'EVENTS', 'COMMUNITY', 'COMMUNITY', 'BASECAMP', 'BASECAMP']


export default function AnimationHomePage({ setShowHome }) {
    const [animationIndex, setAnimationIndex] = useState(0)
    const [animationType, setAnimationType] = useState(animationsForChaining[0])
    const [animatedText, setAnimatedText] = useState(animatedTextArr[0])



    const handleChainAnimation = () => {
        setAnimatedText(animatedTextArr[animationIndex + 1])
        setAnimationType(animationsForChaining[animationIndex + 1])
        setAnimationIndex(animationIndex + 1)
    }


    return (
        <div
            onClick={() => setShowHome(true)}
            id='animationCont'
        >
            <img
                id='homeLogoImg'
                src='/images/logo.png'
                alt="logo"
            />
            <h1>
                <MovingText
                    onAnimationEnd={handleChainAnimation}
                    type={animationType}
                    // type="fadeInFromLeft"
                    duration="1800ms"
                    delay="0s"
                    direction="normal"
                    timing="ease"
                    iteration={1}
                    fillMode="none">
                    {animatedText}
                </MovingText>
            </h1>
            <h2>(Click anywhere to continue)</h2>

        </div>
    )
}