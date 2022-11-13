import React, { Component,useState,useEffect } from 'react';

import '../css/index2.css';
import Logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import i18n from '../../translation/i18n';
import Toast from 'react-bootstrap/Toast';
import { createBrowserHistory } from 'history';
import { BsFillPeopleFill } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';
import Login from '../account/login';
import Dialog from '@mui/material/Dialog';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAPI,postAPI } from '../service/api';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
const customContentStyle = {
    width: '500px',
    maxWidth: 'none',
  };
const getBookAPI =()=>{
    return getAPI('/book/get-book-sell')
}
export const Menu = () => {
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
    const [infoBook,setInfoBook] = useState([])
    useEffect(()=>{
        const getInfoBook = async()=>{
            try {
                const rs = await getBookAPI();
                if( rs.status === 200){
                    console.log(rs['data']);
                    setInfoBook(rs['data']);
                }
            } catch (error) {
                
            }
        };
        getInfoBook();
    },[]);
  return (
    <div className='menu'>
        <div className='menucontent'>
        <Nav defaultActiveKey="/" className="flex-column">
            <NavDropdown id="nav-dropdown-dark-example"title={t('menu.language')} menuVariant="light">
                    <NavDropdown.Item onClick={()=>i18n.changeLanguage('vi')}>{t('menu.lan-vi')}</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>i18n.changeLanguage('en')}>{t('menu.lan-en')}</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/book/add-book">{t('menu.create')}</Nav.Link>
            {/* <Nav.Link href="#">{t('menu.sell')}</Nav.Link> */}
            <Nav.Link href="#">{t('menu.give')}</Nav.Link>

            {/* type */}
            <NavDropdown id="nav-dropdown-dark-example"title={t('menu.categories')}menuVariant="dark">
            <NavDropdown.Item href="#action/3.1" className='item'>
            {t('menu.categories-action')}
            </NavDropdown.Item >
            <NavDropdown.Item href="#action/3.2" className='item'>
            {t('menu.categories-art')}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" className='item'>
            {t('menu.categories-business')}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" className='item'>
            {t('menu.categories-computer')}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.5"className='item'>
            {t('menu.categories-history')}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.6"className='item'>
            {t('menu.categories-entertainment')}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.7"className='item'>
            {t('menu.categories-sport')}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.8"className='item'>
            {t('menu.categories-travel')}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.9"className='item'>
            {t('menu.categories-teen')}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/4.0"className='item'>
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
            <Nav.Link onClick={()=> history.push('/wallet/'+username)}>{t('menu.wallet')}</Nav.Link>
        </Nav>
        <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
            
            <strong className="me-auto">ADMIN</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{t('header.noti')}</Toast.Body>
    </Toast>
    </div>
    </div>
  )
}
