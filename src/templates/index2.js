import React, { Component,useState,useEffect } from 'react';

import './css/index2.css';
import Logo from './images/logo.png';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import i18n from '../translation/i18n';
import Toast from 'react-bootstrap/Toast';
import { createBrowserHistory } from 'history';
import { BsFillPeopleFill } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';
import Login from './account/login';
import Dialog from '@mui/material/Dialog';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAPI,postAPI } from './service/api';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import styled from '@emotion/styled';
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
function Home() {

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
            <Header />
        <div className='homeindex'>
            <Menu />
            <div className='content'>
                {infoBook.map((row)=>(
                    <Card bg='light'>
                    <Card.Img variant="top" src={row.url} />
                    <Card.Body id='bodycard'>
                        <Card.Title>{row.name}</Card.Title>
                        <Card.Text id='detail-name'>{row.detail.substring(0,350)}{'...'}
                        </Card.Text>
                        <Card.Text>{"NXB: "}{row.nxb}</Card.Text>
                        <Card.Text >{" Country:"}{t(row.country)}</Card.Text>
                        <Card.Text>{"SL: "}{row.amount} {"Pirce: "}{row.price}{" VND"}</Card.Text>
                        <Card.Text>{"User: "}{row.username}</Card.Text>
                        <Button variant="primary">Detail</Button>
                    </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
        <Footer />
        </Wrapper>
     );
}

export default Home;
export const Wrapper = styled.div`
        .container-index{
            max-height: fit-content;
        }
`