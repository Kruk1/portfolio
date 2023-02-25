import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './style/contact.css'
import Loading from './Loading'

function Contact(){
    const [contactForm, setContactForm] = useState(
        {
            name: '',
            email: '',
            title: '',
            content: ''
        }
    )
    const [isEmailFormOpen, setIsEmailFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(
        {
            message: '',
            style: {
                color: ''
            }
        }
    )

    console.log(contactForm)

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        setContactForm((prev) => 
            {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    function openEmailForm()
    {
        setIsEmailFormOpen(true)
    }

    async function handleSubmit(event: React.FormEvent)
    {
        try
        {
            event.preventDefault()
            setIsLoading(true)
            const data = await axios.post(import.meta.env.VITE_MAIL_URL as string, {
                name: contactForm.name,
                email: contactForm.email,
                title: contactForm.title,
                text: contactForm.content
            })
            setResponse(
                {
                    message: data.data,
                    style: {
                        color: '#00dd00'
                    }
                }
            )
            setContactForm({
                name: '',
                email: '',
                title: '',
                content: ''
            })
            setIsLoading(false)
        }
        catch(e: any)
        {
            setResponse(
                {
                    message: e?.response?.data as string,
                    style: {
                        color: 'red'
                    }
                }
            )
            setTimeout(() => setIsLoading(false), 1000)
        }
    }

    return (
        <>
            <h1>Contact</h1>
            <div className="social-media-container">
                <a href='#' className="social-media linkedin">
                    <i className="icon-linkedin"></i>
                    <p>Linkedin</p>
                    <div className="bg-linkedin"></div>
                </a>
                <a href='#' className="social-media twitter">
                    <i className="icon-twitter"></i>
                    <p>Twitter</p>
                    <div className="bg-twitter"></div>
                </a>
                <a href='#' className="social-media whatsapp">
                    <i className="icon-whatsapp"></i>
                    <p>Whatsapp</p>
                    <div className="bg-whatsapp"></div>
                </a>
                <a href='#' className="social-media instagram">
                    <i className="icon-instagram"></i>
                    <p>Instagram</p>
                    <div className="bg-instagram"></div>
                </a>
            </div>
            <div className="email-container">
                <div className="email-form">
                    {isEmailFormOpen ?
                        isLoading ? <Loading/> :             
                        <motion.form animate={{opacity: 1}} onSubmit={handleSubmit}>
                            {response.message ? <p style={response.style}>{response.message}</p> : null}
                            <i className="icon-mail"></i>
                            <h2>Send email (response time 24h)</h2>
                            <div className="email-container-inputs">
                                <label htmlFor="name" className='hidden'>Name</label>
                                <input type="text" name="name" className='email-input' placeholder='Name' onChange={handleChange} value={contactForm.name} />
                                <label htmlFor="email" className='hidden'>Email</label>
                                <input type="email" name="email" className='email-input' placeholder='Email (e.g. example@example.com)' onChange={handleChange} value={contactForm.email} />
                            </div>
                            <label htmlFor="title" className='hidden'>Title</label>
                            <input type="text" name="title" id='title' placeholder='Title' onChange={handleChange} value={contactForm.title} />
                            <textarea name="content" id="content" cols={131} rows={10} placeholder='Write your message here!' onChange={handleChange} value={contactForm.content}></textarea>
                            <button>Send Email</button>
                        </motion.form> : 
                        <div className='open-form' onClick={openEmailForm}>
                            <i className="icon-mail"></i>
                            <p>E-mail</p>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Contact