import React, { useEffect, useRef, useState } from 'react'
import './style/footer.css'

function Footer() {

    return (
        <footer>
            <p>Website was created by Albert Krysiak &copy;</p>
            <div className="social-media-footer">
                <a href="#"><i className="icon-linkedin"></i></a>
                <a href="#"><i className="icon-twitter"></i></a>
                <a href="#"><i className="icon-whatsapp"></i></a>
                <a href="#"><i className="icon-instagram"></i></a>
            </div>
        </footer>
    )
}

export default Footer
