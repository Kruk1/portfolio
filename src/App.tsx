import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Nav from './nav'
import './style/intro.css'
import './style/about.css'
import './style/cleanStyle.css'
import Typing from './typing/typing'
import { useInView } from 'framer-motion'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'

type scrollSections =
{
    intro: HTMLDivElement | null;
    projects: HTMLDivElement | null;
    contact: HTMLDivElement | null;
}

function App() {
    let date: Date = new Date()
    const exe = useRef<HTMLDivElement>(null)
    const intro = useRef<HTMLDivElement>(null)
    const projects = useRef<HTMLDivElement>(null)
    const contact = useRef<HTMLDivElement>(null)
    const paragraph = useRef<HTMLDivElement>(null)
    const isInView = useInView(paragraph)
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
    const [styleTech, setStyleTech] = useState(
        {
            opacity: 0,
            display: 'none'
        }
    )

    function displayIntro()
    {
        setDisplayExe(prev => !prev)
        setIsButtonActive(prev => !prev)
        setTimeout(open, 0)
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
        setTimeout(open, 0)
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
            if(!document.querySelector('#type')) return
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

    function scroll()
    {
        if(isInView) return
        setStyleTech({
            opacity: 1,
            display: 'block'
        })
    }

    useEffect(() => 
    {
        window.addEventListener('scroll', scroll)
        return () => window.removeEventListener('scroll', scroll)
    })

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
        setPropsNav({intro: intro.current, projects: projects.current, contact: contact.current})
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
                                        <img src="myphoto.jpg" alt="my photo" className='avatar'/>
                                    </div>
                                    <div className="about">
                                        <div className='type-container whitespace' id='type'><div className="type-cont"></div></div>
                                        <p className='about-text' style={styleAbout}>I am making fullstack applications like blogs, online shops, communication chat and more!</p>
                                        <a href="#about" className='button-check'style={styleAbout}>Check more!</a>
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
                                <span className='date-margin'>{`${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="monitor-lower"></div>
                    <div className="monitor-stabilizer"></div>
                </section>
                <section id="about">
                    <h1>About me</h1>
                    <p className="about-info">My journey with programing started 2018 in middle school, while my IT lesson. In this time, I got to know HTML and CSS, which make huge satisfaction to learn it. I am self-taught developer, who really enjoy programing with wide stack of technology and dont afraid of new challenges</p>
                    <h2>Technology which I am using</h2>
                    <div className="tech-stack" style={styleTech} ref={paragraph}>
                        <div className="tech-container">
                            <label htmlFor="html-progress">
                                <h3>HTML</h3>
                            </label>
                            <progress id="html-progress" className="tech-progress-bar html" value="80" max="100"></progress>
                        </div>
                        <div className="tech-container">
                            <label htmlFor="css-progress">
                                <h3>CSS</h3>
                            </label>
                            <progress id="css-progress" className="tech-progress-bar css" value="80" max="100"></progress>
                        </div>
                        <div className="tech-container">
                            <label htmlFor="ts-progress">
                                <h3>TypeScript</h3>
                            </label>
                            <progress id="ts-progress" className="tech-progress-bar ts" value="65" max="100"></progress>
                        </div>
                        <div className="tech-container">
                            <label htmlFor="react-progress">
                                <h3>React</h3>
                            </label>
                            <progress id="react-progress" className="tech-progress-bar react" value="45" max="100"></progress>
                        </div>
                        <div className="tech-container other-tech">
                            <h3>Other technologies</h3>
                            <div className="technologies">
                                <div className="tech-short">
                                    <h4>Express</h4>
                                </div>
                                <div className="tech-short">
                                    <h4>Axios</h4>
                                </div>
                                <div className="tech-short">
                                    <h4>MongoDB</h4>
                                </div>
                                <div className="tech-short">
                                    <h4>MySQL</h4>
                                </div>
                                <div className="tech-short">
                                    <h4>PHP</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="projects" ref={projects}>
                    <Projects />
                </section>
                <section id="contact" ref={contact}>
                    <Contact />
                </section>
            </main>
            <Footer />
        </>)}

export default App

