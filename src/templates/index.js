import React, { Component,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import i18n from '../translation/i18n';
import Toast from 'react-bootstrap/Toast';
import { createBrowserHistory } from 'history';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login from './account/login';
import logo from './images/logo.png';
import { BsFillPeopleFill } from "react-icons/bs";

import './css/index.css';
export default function Index(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    let username = '';
    const history = createBrowserHistory({
        forceRefresh: true
    });
    //show toast
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    //get username from token
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    if(token!=null){
        username = parseJwt(token)['sub']; }
    else{
        username = '';
        console.error('Invalid token: ' + token);
    }
    // console.log(username);
    const goProfile=()=>{
        history.push('/profile/'+username)
    }
    return(
        <Container>
            {/* <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast> */}
        <Row>
            <Col sm={2} className='hmenu'>
            <Button variant="link" href="/">
                <img src={logo} alt='logo' />
            </Button>
            </Col>
            <Col className='headerMenu'>
                <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">{t('header.market')}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={goProfile}>{t('header.profile')}</Nav.Link>
                        <Nav.Link onClick={toggleShowA}>{t('header.notification')}</Nav.Link>
                        <Nav.Link href="#" disabled>
                        {t('header.friends')}
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="......"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">{t('header.search')}</Button>
                    </Form>
                    {username!=""
                    ? <p id='username'> <BsFillPeopleFill/>{username}</p>
                    : <Button variant="primary" disabled id='loading'>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                    </Button>}
                        <Nav>
                            {username!=''
                            ?<Nav.Link href="/logout">{t('header.signout')}</Nav.Link>
                            :<Nav.Link onClick={handleClickOpen}>{t('header.signin')}</Nav.Link>
                            }
                            {/* <Nav.Link href="/login">{t('header.signin')}</Nav.Link>
                            <Nav.Link eventKey={2} href="/register">
                            {t('header.signup')}
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Login />
                        </Dialog>
                </Container>
                </Navbar>
            </Col>
        </Row>
        <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
                <img
                src={logo}
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">ADMIN</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{t('header.noti')}</Toast.Body>
        </Toast>
        <Row>
            <Col sm={2} className='menu'>
                <Nav defaultActiveKey="/" className="flex-column">
                    <NavDropdown id="nav-dropdown-dark-example"title={t('menu.language')} menuVariant="light">
                            <NavDropdown.Item onClick={()=>i18n.changeLanguage('vi')}>{t('menu.lan-vi')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>i18n.changeLanguage('en')}>{t('menu.lan-en')}</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/book/add-book">{t('menu.create')}</Nav.Link>
                    <Nav.Link href="#">{t('menu.sell')}</Nav.Link>
                    <Nav.Link href="#">{t('menu.give')}</Nav.Link>

                    {/* type */}
                    <NavDropdown id="nav-dropdown-dark-example"title={t('menu.categories')}menuVariant="dark">
                    <NavDropdown.Item href="#action/3.1">
                    {t('menu.categories-action')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                    {t('menu.categories-art')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                    {t('menu.categories-business')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                    {t('menu.categories-computer')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.5">
                    {t('menu.categories-history')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.6">
                    {t('menu.categories-entertainment')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.7">
                    {t('menu.categories-sport')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.8">
                    {t('menu.categories-travel')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.9">
                    {t('menu.categories-teen')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/4.0">
                    {t('menu.categories-other')}
                    </NavDropdown.Item>
                    </NavDropdown>

                    {/* country */}
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={t('menu.country')}
                        menuVariant="dark"
                        >
                        <NavDropdown.Item href="#action/3.1">{t('menu.lan-vi')}</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                        {t('menu.country-france')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">{t('menu.country-usa')}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                        {t('menu.categories-other')}
                        </NavDropdown.Item>
                        </NavDropdown>
                    {/* wallet */}
                    <Nav.Link href="#">{t('menu.wallet')}</Nav.Link>
                </Nav>
            </Col>
            <Col sm={10}className='content'>{t('header.market')}</Col>
        </Row>
        
      </Container>
      
    );
}