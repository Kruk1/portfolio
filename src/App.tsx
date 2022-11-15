import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Nav from './nav'
import './style/intro.css'
import './style/tech-stack.css'
import './style/cleanStyle.css'
import Typing from './typing/typing'

type scrollSections =
{
    intro: HTMLDivElement | null;
    tech: HTMLDivElement | null;
}

function App() {

    let date: Date = new Date()
    const exe = useRef<HTMLDivElement>(null)
    const intro = useRef<HTMLDivElement>(null)
    const tech = useRef<HTMLDivElement>(null)
    const [propsNav, setPropsNav] = useState<scrollSections>()
    const [styleAbout, setStyleAbout] = useState(
        {
            opacity: 0
        }
    )
    const fullScreen: CSSProperties = {
        width: '100%',
        height: '100%',
        borderRadius: '0',
        margin: '0'
    }
    const [displayExe, setDisplayExe] = useState(true)
    const [isButtonActive, setIsButtonActive] = useState(true)
    const [isFullScreen, setIsFullScreen] = useState(false)

    function displayIntro()
    {
        setDisplayExe(prev => !prev)
        setIsButtonActive(prev => !prev)
        setTimeout(open, 500)
    }

    function minimalizeExe()
    {
        exe.current!.style.animation = `minimalize 0.5s forwards`
    }

    function animationEnd(event: React.AnimationEvent)
    {
        if(event.animationName !== 'minimalize') return
        setDisplayExe(prev => !prev)
        setIsButtonActive(prev => !prev)
        setTimeout(open, 500)
    }

    function resizeExe()
    {
        setIsFullScreen(prev => !prev)
    }

    async function open() 
    {
        try
        {
            setStyleAbout({opacity: 0})
            const typeContainer = '#type'
            const typeCont = document.querySelector('.type-cont') as HTMLElement
            const type = new Typing(typeContainer, {loop: false, duration: 300}, typeCont)
            await type.type('Hi my name is Albert!\n')
            await type.type('I am fullstack developer!')
            setStyleAbout({opacity: 1})
        }
        catch(e)
        {
            console.log(e)
        }
    }

    useEffect(() => 
    {
        const typeContainer = '#type'
        const typeCont = document.querySelector('.type-cont') as HTMLElement
        const type = new Typing(typeContainer, {loop: false, duration: 300}, typeCont)
        async function typeIntro()
        {
            try
            {
                await type.type('Hi my name is Albert!\n')
                await type.type('I am fullstack developer!')
                setStyleAbout({opacity: 1})
            }
            catch(e)
            {
                console.log(e)
            }
        }
        typeIntro()
        setPropsNav({intro: intro.current, tech: tech.current})
    }, [])

    return (
        <>
            <Nav scrollSections={propsNav}/>
            <main className="App">
                <section id='introduce' ref={intro}>
                    <div className="monitor">
                        {displayExe ? 
                            <div className="app-exe" style={isFullScreen ? fullScreen : {}} ref={exe} onAnimationEnd={animationEnd}>
                                <div className="toolbar">
                                    <button className="hide" onClick={minimalizeExe}></button>
                                    <button className="resize" onClick={resizeExe}></button>
                                    <button className="exit" onClick={displayIntro}></button>
                                </div>
                                <div className="app-content">
                                    <div className="avatar-container">
                                        <img src="myphoto.jpg" alt="" className='avatar'/>
                                    </div>
                                    <div className="about">
                                        <div className='type-container whitespace' id='type'><div className="type-cont"></div></div>
                                        <p className='about-text' style={styleAbout}>I am self-taught fullstack developer with passion. I have been coding for 4 years and i am ready for working with you </p>
                                        <a href="#" className='button-check'style={styleAbout}>Check more!</a>
                                    </div>
                                </div>
                            </div> : null
                        }
                        <div className="win-toolbar">
                            <div className="win-buttons">
                                <a href="#"><i className="icon-windows"></i></a>
                                <a href="#"><i className="icon-search"></i></a>
                                <a href="#"><i className="icon-chrome"></i></a>
                                <button style={isButtonActive ? {backgroundColor: '#434343'} : {}} onClick={displayIntro}>exe</button>
                            </div>
                            <div className="date">
                                {`${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`}
                                <span className='date-margin'>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="monitor-lower"></div>
                    <div className="monitor-stabilizer"></div>
                </section>
                <section id="tech-stack" ref={tech}>
                    <h1>Technology what i use</h1>
                </section>
            </main>
        </>
    )
}

export default App
