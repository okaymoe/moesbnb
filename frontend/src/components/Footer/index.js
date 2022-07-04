import React from 'react';
import './Footer.css'

const Footer = () => {
    return(
        <div className="main-footer">
            <a id="github" href="https://github.com/okaymoe">
                <img id="github" src="https://pngimg.com/uploads/github/github_PNG83.png" alt="github" width="60px"></img>
            </a>
            <a id="linkedin" href="https://www.linkedin.com/in/mohamadamirhussein/">
                <img id="linkedin" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" width="60px"></img>
            </a>
        </div>
    );
}

export default Footer;