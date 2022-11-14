import { useEffect, useRef, useState } from 'react'
import './style/nav.css'

function Nav() {
    const list = useRef<HTMLUListElement>(null)
    const [indexNavItem, setIndexNavItem] = useState(0)
    const [scale, setScale] = useState(0)
    const activeItem = useRef<HTMLDivElement>(null)
    
    function scaleAnimation()
    {
        setScale(1)
    }

    useEffect(() => 
    {
        setTimeout(scaleAnimation, 1500)
    }, [])

    function animateNav(event: React.MouseEvent)
    {
        const boolArr = Array.from(list.current!.children).map((item: any) => item.firstChild?.firstChild === event.currentTarget.firstChild?.firstChild)
        const indexItem = boolArr.indexOf(true)
        setIndexNavItem(100 * indexItem)
    }

    return (
        <header className='nav'>
            <nav className='nav-controllers'>
                <a href="#"><img src="./logo.png" alt="" /></a>
                <div className="nav-list">
                    <ul ref={list}>
                        <li onClick={animateNav}><a href="#">About</a></li>
                        <li onClick={animateNav}><a href="#">Projects</a> </li>
                        <li onClick={animateNav}><a href="#">Tech Stack</a></li>
                        <li onClick={animateNav}><a href="#">Contact</a></li>
                    </ul>
                    <div className="active" ref={activeItem} style={{transform: `translateX(${indexNavItem}%) scale(${scale})`}}></div>
                </div>
            </nav>
        </header>
    )
}

export default Nav
