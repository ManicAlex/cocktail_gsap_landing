import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
    // Ref for the background video
    const videoRef = useRef();
    // Media query to check for mobile devices
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        // Split the title and subtitle text for animation
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        // Add gradient class to each character in the title from index.css
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        // Animate the characters of the title
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
        })

        // Animate the lines of the subtitle paragraph
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        })

        // Leaf parallax animation on scroll
        gsap.timeline({
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            
            }
        })
        .to('.right-leaf', { y:200 }, 0)
        .to('.left-leaf', { y:-200 }, 0)

        // Adjust ScrollTrigger start and end based on device type
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        // Video scroll scrub animation
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "video",
            start: startValue,
            end: endValue,
            scrub: true,
            pin: true,
        },
        });
        
        // Ensure video metadata is loaded before animating
        videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
            currentTime: videoRef.current.duration,
        });
        };
    }, [])

  return (
    <>
    {/* Hero Section */}
	 <section id="hero" className="noisy">
		<h1 className="title">MOJITO</h1>

    {/* Decorative Leaf Images	 */}
		<img
		 src="/images/hero-left-leaf.png"
		 alt="left-leaf"
		 className="left-leaf"
		/>
		<img
		 src="/images/hero-right-leaf.png"
		 alt="right-leaf"
		 className="right-leaf"
		/>
		
        {/* Hero Body Content */}
		<div className="body">
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>Cool. Crisp. Classic.</p>
			 <p className="subtitle">
				Sip the Spirit <br /> of Summer
			 </p>
			</div>
			
			<div className="view-cocktails">
			 <p className="subtitle">
				Every cocktail on our menu is a blend of premium ingredients,
				creative flair, and timeless recipes — designed to delight your
				senses.
			 </p>
			 <a href="#cocktails">View cocktails</a>
			</div>
		 </div>
		</div>
	 </section>

    {/* Background Video */}
     <div className="video absolute inset-0">
        <video
        ref={videoRef}
         src="/videos/output.mp4"
         muted
         playsInline
         preload='auto'
         />
     </div>
    </>
  )
}

export default Hero