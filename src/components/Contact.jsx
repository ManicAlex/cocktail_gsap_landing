import React from 'react'
import { openingHours, socials } from '../../constants/index.jsx'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'

const Contact = () => {

    useGSAP(() => {
        const titleSplit = SplitText.create('.content h2', { type: 'words' });
        // Scroll-triggered animation timeline
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: 'power1.inOut',
        })

        // Animate title words
        timeline.from(titleSplit.words, {
            opacity: 0, yPercent: 100, duration: 1, stagger: 0.02,
        })
        .from('#contact h3, #content p', {
            opacity: 0, yPercent: 100, stagger: 0.2,
        })

        .to('#f-left-leaf', { y: 50, duration: 1, ease: 'power1.inOut' })
        .to('#f-right-leaf', { y: 50, duration: 1, ease: 'power1.inOut' }, '<')
        .from('#drink-img', { x: 100, opacity: 0, duration: 1, ease: 'power1.inOut' })

    })

        
  return (
    <footer id="contact">
        <img src="/images/footer-left-leaf.png" alt="l-leaf" id="f-left-leaf"/>
        <img src="/images/footer-right-leaf.png" alt="r-leaf" id="f-right-leaf"/>
        <img src="/images/footer-drinks.png" alt="footer-drinks" id="drink-img" className="drink-img"/>

        <div className="content">
            <h2>Where to Find Us</h2>

            <div>
                <h3>Visit Our Bar</h3>
                <p>Reichenbachstraße 19, 80469 München, Germany</p>
            </div>

            <div>
                <h3>Contact Us</h3>
                <p> +49 89 2345 6789</p>
                <p>VelvetPour@gmail.com</p>
            </div>

            <div>
                <h3>Open EveryDay</h3>
                {openingHours.map((time) => (
                <p key={time.day}>
                    {time.day}: {time.time}
                </p>
                ))}
            </div>

            <div>
                <h3>Socials</h3>
		        <div className="flex-center gap-5">
                    {socials.map((social) => (
                    <a key={social.name} href={social.url} 
                    target="_blank" rel="noopener noreferrer"
                    aria-label={social.name}>
                        <img src={social.icon} />
                    </a>
                    ))}
                </div>
            </div>

        </div>

    </footer>
  )
}

export default Contact