import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './style/projects.css'

function Projects() {
    const [lastTranslate, setLastTranslate] = useState<number>(0)
    const [slideWitdh, setSlideWidth] = useState<number>(-1177.45)
    const [maxSlideMove, setMaxSlideMove] = useState<number>(-3532.35)
    const [styleSlider, setStyleSlider] = useState<{ x: any}>(
        {
            x: 0
        }
    )

    function slideLeft()
    {
        if(styleSlider.x === 0) return 
        if(lastTranslate - slideWitdh >= 0)
            setStyleSlider({
                x: lastTranslate + Math.abs(lastTranslate)
            })
        else 
        {
            setStyleSlider({
                x: lastTranslate - (lastTranslate - slideWitdh * (Math.ceil(lastTranslate / slideWitdh) - 1))
            })
        }
        console.log(lastTranslate - (lastTranslate - slideWitdh * (Math.ceil(lastTranslate / slideWitdh) - 1)))
        setLastTranslate(lastTranslate - (lastTranslate - slideWitdh * (Math.ceil(lastTranslate / slideWitdh) - 1)))
        setTimeout(setActiveBtn, 350)
    }

    function slideRight()
    {
        if(styleSlider.x === maxSlideMove) return 
        if(lastTranslate + slideWitdh <= maxSlideMove)
            setStyleSlider({
                x: maxSlideMove
            })
        else 
        {
            setStyleSlider({
                x: lastTranslate - (lastTranslate + slideWitdh * (Math.ceil(lastTranslate / -slideWitdh) - 1))
            })
        }
        console.log(lastTranslate - (lastTranslate + slideWitdh * (Math.ceil(lastTranslate / -slideWitdh) - 1)))
        setLastTranslate(lastTranslate - (lastTranslate + slideWitdh * (Math.ceil(lastTranslate / -slideWitdh) - 1)))
        setTimeout(setActiveBtn, 350)
    }

    function pan()
    {
        const translate = window.getComputedStyle(document.querySelector('.projects-container-drag')!)
        const matrix = new DOMMatrixReadOnly(translate.transform)
        setLastTranslate(matrix.m41)
    }

    function AnimateRemove()
    {
        setStyleSlider({
            x: null
        })
    }

    function setActive(event: React.MouseEvent)
    {
        const activeBtn = document.querySelector('.slider-btn.slider-active')
        const currBtn = event.target as Element
        activeBtn?.classList.remove('slider-active')
        currBtn.classList.add('slider-active') 
        setStyleSlider({
            x: slideWitdh * Array.from(currBtn.parentElement!.children).indexOf(currBtn)
        })
    }

    function setActiveBtn()
    {
        const activeBtn = document.querySelector('.slider-btn.slider-active')
        const translate = window.getComputedStyle(document.querySelector('.projects-container-drag')!)
        const matrix = new DOMMatrixReadOnly(translate.transform)
        const activeBtns = document.querySelectorAll('.slider-btn')
        if(matrix.m41 > slideWitdh / 2)
        {
            activeBtn?.classList.remove('slider-active')
            activeBtns[0].classList.add('slider-active') 
        }
        else if(matrix.m41 <= slideWitdh / 2 && matrix.m41 > slideWitdh / 2 + slideWitdh)
        {
            activeBtn?.classList.remove('slider-active')
            activeBtns[1].classList.add('slider-active') 
        }
        else if(matrix.m41 <= slideWitdh / 2 + slideWitdh && matrix.m41 > slideWitdh / 2 + slideWitdh * 2)
        {
            activeBtn?.classList.remove('slider-active')
            activeBtns[2].classList.add('slider-active') 
        }
        else if(matrix.m41 <= slideWitdh / 2 + slideWitdh * 2)
        {
            activeBtn?.classList.remove('slider-active')
            activeBtns[3].classList.add('slider-active') 
        }
        else
        {
            let never:never
        }
    }

    function dragInfo()
    {
        if(window.innerWidth > 1285) 
        {
            setSlideWidth(-1177.45)
            setMaxSlideMove(-3532.35)
        }
        else if(window.innerWidth <= 1285 && window.innerWidth > 1070)
        {
            setSlideWidth(-983.547)
            setMaxSlideMove(-983.547 * 3)
        }
        else if(window.innerWidth <= 1070 && window.innerWidth > 880)
        {
            setSlideWidth(-789.641)
            setMaxSlideMove(-789.641 * 3)
        }
        else if(window.innerWidth <= 880 && window.innerWidth > 690)
        {
            setSlideWidth(-595.719)
            setMaxSlideMove(-595.719 * 3)
        }
        else if(window.innerWidth <= 690 && window.innerWidth > 420)
        {
            setSlideWidth(-401.812)
            setMaxSlideMove(-401.812 * 3)
        }
        else if(window.innerWidth <= 420)
        {
            setSlideWidth(-314.547)
            setMaxSlideMove(-314.547 * 3)
        }
        else 
        {
            let never:never
        }
    }

    useEffect(() => 
    {
        dragInfo()
    }, [])

    return (
        <>
            <h1>Projects</h1>
            <div className="slider">
                <div className="slide-btn" onClick={slideLeft} onMouseEnter={pan}><i className="icon-left-open-big"></i></div>
                <div className="projects-container">
                    <motion.div drag="x" className="projects-container-drag" dragConstraints={{left: maxSlideMove, right: 0}} onMouseDown={setActiveBtn} onDragStart={AnimateRemove} animate={styleSlider} dragTransition={{ timeConstant: 350 }} transition={{ duration: .5 }} onDragTransitionEnd={setActiveBtn}>
                        <motion.article className="project" whileInView={{opacity: 1}}>
                            <img src="./project1.png" alt="project background" className="project-bg"/>
                            <div className="project-info">
                                <h2>Games database</h2>
                                <p>Games database is a project, which give you pices of information about thousands computer games. You can find your new game to play or check if you can play with friends in multiplayer</p>
                                <div className="project-buttons">
                                    <a href="#"><i className="icon-github-circled"></i></a>
                                    <a href="#"><i className="icon-globe"></i></a>
                                </div>
                            </div>
                        </motion.article>
                        <motion.article className="project" whileInView={{opacity: 1}}>
                            <img src="./project1.png" alt="project background" className="project-bg"/>
                            <div className="project-info">
                                <h2>Games database</h2>
                                <p>Games database is a project, which give you pices of information about thousands computer games. You can find your new game to play or check if you can play with friends in multiplayer</p>
                                <div className="project-buttons">
                                    <a href="#"><i className="icon-github-circled"></i></a>
                                    <a href="#"><i className="icon-globe"></i></a>
                                </div>
                            </div>
                        </motion.article>
                        <motion.article className="project" whileInView={{opacity: 1}}>
                            <img src="./project1.png" alt="project background" className="project-bg"/>
                            <div className="project-info">
                                <h2>Games database</h2>
                                <p>Games database is a project, which give you pices of information about thousands computer games. You can find your new game to play or check if you can play with friends in multiplayer</p>
                                <div className="project-buttons">
                                    <a href="#"><i className="icon-github-circled"></i></a>
                                    <a href="#"><i className="icon-globe"></i></a>
                                </div>
                            </div>
                        </motion.article>
                        <motion.article className="project" whileInView={{opacity: 1}}>
                            <img src="./project1.png" alt="project background" className="project-bg"/>
                            <div className="project-info">
                                <h2>Games database</h2>
                                <p>Games database is a project, which give you pices of information about thousands computer games. You can find your new game to play or check if you can play with friends in multiplayer</p>
                                <div className="project-buttons">
                                    <a href="#"><i className="icon-github-circled"></i></a>
                                    <a href="#"><i className="icon-globe"></i></a>
                                </div>
                            </div>
                        </motion.article>
                    </motion.div>
                </div>
                <div className="slide-btn" onClick={slideRight} onMouseEnter={pan}><i className="icon-right-open-big"></i></div>
            </div>
            <div className="slider-btns">
                <button className="slider-btn slider-active" aria-label='Show project 1' onClick={setActive}></button>
                <button className="slider-btn" aria-label='Show project 2' onClick={setActive}></button>
                <button className="slider-btn" aria-label='Show project 3' onClick={setActive}></button>
                <button className="slider-btn" aria-label='Show project 4' onClick={setActive}></button>
            </div>
        </>
    )
}

export default Projects
