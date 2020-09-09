import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import githubLogo from '../static/github.svg';
import emailLogo from '../static/email.svg';
import linkedinLogo from '../static/linkedin.svg';

function Footer () {
    return(
        <Container maxWidth="lg" className="footer">
            <Grid sm={10}/>
            <Grid sm={2}>
                <a href="mailto:seandacquel@gmail.com">
                    <img src={emailLogo} className="logo" alt="email"/>
                </a>
                <a href="https://www.linkedin.com/in/sean-dacquel/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={linkedinLogo} className="logo" alt="linkedin" />
                </a>
                <a href="https://github.com/sndacq"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={githubLogo} className="logo" alt="github" />
                </a>
            </Grid>
        </Container>
    );
}

export default Footer;