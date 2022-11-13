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
import styled from '@emotion/styled';

const getBookAPI =()=>{
    return getAPI('/book/get-book-sell')
}
export const Header = () => {
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
    <Wrapper>
        <div className='header'>
        <img src={Logo} onClick={()=>history.push('/')}></img>
        <Nav className="justify-content-end" activeKey="/home">

                <Nav.Item className='nav-1'>
                <Nav.Link >{t('header.market')}</Nav.Link>
                </Nav.Item>
                <Nav.Item className='nav-1'>
                <Nav.Link onClick={goProfile}>{t('header.profile')}</Nav.Link>
                </Nav.Item>
                <Nav.Item className='nav-1'>
                <Nav.Link onClick={toggleShowA}>{t('header.notification')}</Nav.Link>
                </Nav.Item>
                {/* search */}
                <Nav.Item>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder=".........."
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">{t('header.search')}</Button>
                </Form>
                </Nav.Item>
                {/* account */}
                <Nav.Item id='account'>
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
                {username!=''
                    ?<Nav.Link href="/logout">{t('header.signout')}</Nav.Link>
                    :<Nav.Link onClick={handleClickOpen}>{t('header.signin')}</Nav.Link>
                    }
                </Nav.Item>
            </Nav>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='lg'
        >
            <Login />
        </Dialog>
        
    </Wrapper>
  )
}
export const Wrapper = styled.div`
    .header{
        z-index: 1000;
        display: flex;
        max-height: 4rem;
        padding: 0px;
        position: fixed;
        background-color: rgba(196, 189, 153, 0.459);
        width: 100%;
        a{
           font-weight: bold;
        }
        img{
            max-width: 200px;
            max-height: 3rem;
        }
        .d-flex{
            /* padding-top: 10px; */
            width: 100%;
        }
        #account{
            /* position: absolute; */
            display: flex;
            right: 0px;
            float: right;
            #username{
                padding: 15px;
            }
        }
        .justify-content-end{
            margin: 20px;
            float: right;
        }
    }
`