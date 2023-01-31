import React, { useEffect, useRef, useState } from 'react'
import './style/nav.css'

function Nav(props: any) {
    const list = useRef<HTMLUListElement>(null)
    const [indexNavItem, setIndexNavItem] = useState(0)
    const [scale, setScale] = useState(0)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const activeItem = useRef<HTMLDivElement>(null)

    function scaleAnimation()
    {
        setScale(1)
    }

    function scroll()
    {
        if(window.innerWidth <= 650) return
        if(props.scrollSections.projects.offsetTop - 100 > window.pageYOffset)
            setIndexNavItem(0)
        else if(props.scrollSections.projects.offsetTop - 100 <= window.pageYOffset && props.scrollSections.contact.offsetTop - 100 > window.pageYOffset)
            setIndexNavItem(100)
        else if(props.scrollSections.contact.offsetTop - 100 <= window.pageYOffset)
            setIndexNavItem(200)
        else
        {
            let never: never
        }
    }

    function showNav()
    {
        if(window.innerWidth >= 650) return
        setIsNavOpen(prev => !prev)
        document.body.style.overflow = ''
    }

    function hideNav()
    {
        if(window.innerWidth >= 650) return
        setIsNavOpen(false)
        document.body.style.overflow = ''
    }

    function overflow(event: React.AnimationEvent)
    {
        if(event.animationName !== 'translate-open') return
        document.body.style.overflow = 'hidden'
    }

    useEffect(() => 
    {
        window.addEventListener('scroll', scroll)
        return () => window.removeEventListener('scroll', scroll)
    })

    useEffect(() => 
    {
        setTimeout(scaleAnimation, 1500)
        if(window.innerWidth > 650) 
            setIsNavOpen(true)
    }, [])

    return (
        <header className='nav'>
            <nav className='nav-controllers'>
                <a href="#" onClick={hideNav}><img src="./logo.png" alt="" /></a>
                <div className="nav-list" onClick={showNav}>
                    {isNavOpen ? <i className="icon-cancel visible"></i> : <i className="icon-menu visible"></i>}
                    {isNavOpen ? 
                    <>
                        <ul ref={list} onAnimationEnd={overflow}>
                            <li><a href="#introduce">About</a></li>
                            <li><a href="#projects">Projects</a> </li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#">Resume</a></li>
                        </ul>
                        <div className="active" ref={activeItem} style={{transform: `translateX(${indexNavItem}%) scale(${scale})`}}></div>
                    </>
                    : null}
                </div>
            </nav>
        </header>
    )
}

export default Nav
