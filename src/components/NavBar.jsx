import React from 'react'
import { gsap } from 'gsap'
import { navLinks } from '../../constants/index.jsx'
import { useGSAP } from '@gsap/react'

const Navbar = () => {
    // GSAP Animation for NavBar Background on Scroll
 useGSAP(() => {
	const navTween = gsap.timeline({
	 scrollTrigger: {
		trigger: 'nav',
		start: 'bottom top'
	 }
	});
	
    // Animate nav background color and blur on scroll
	navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
	 backgroundColor: '#00000050',
	 backgroundFilter: 'blur(10px)',
	 duration: 1,
	 ease: 'power1.inOut'
	});
 })
 
 return (
	<nav>
	 <div>
        {/* Logo Section */}
		<a href="#home" className="flex items-center gap-2">
		 <img src="/images/logo.png" alt="logo" />
		 <p>Velvet Pour</p>
		</a>
		
        {/* Navigation Links from constants/index.jsx */}
		<ul>
		 {navLinks.map((link) => (
			<li key={link.id}>
			 <a href={`#${link.id}`}>{link.title}</a>
			</li>
		 ))}
		</ul>
	 </div>
	</nav>
 )
}
export default Navbar