import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import githubLogo from '../static/github.svg';
import emailLogo from '../static/email.svg';
import linkedinLogo from '../static/linkedin.svg';

function Footer () {
    return(
        <Container className="footer" fluid>
            <Row>
                <Col sm={10}/>
                <Col sm={2}>
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
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;