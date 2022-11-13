import React, { Component,useState,useEffect } from 'react';
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
import i18n from '../../translation/i18n';
import Toast from 'react-bootstrap/Toast';
import { createBrowserHistory } from 'history';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login from '../account/login';
import logo from '../images/logo.png';
import { BsFillPeopleFill } from "react-icons/bs";
import Alert from 'react-bootstrap/Alert';
import useClipboard from 'react-hook-clipboard';
import { getAPI } from '../service/api';
import '../css/profile.css';
import { useParams } from 'react-router-dom';

const getbookAPI = (idBook)=>{
    return getAPI('/book/profile/'+idBook)
}
export default function BProfile(){
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    let username = '';
    const [infoBook,setInfoBook] = useState([]);
    const [url,setUrl] = useState('');
    let {idBook} = useParams();

    const history = createBrowserHistory({
        forceRefresh: true
    });
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [open, setOpen] = React.useState(false);
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    if(token!=null){
        username = parseJwt(token)['sub']; }
    else{
        console.error('Invalid token: ' + token);
    }
    // console.log(username);
    const goProfile=()=>{
        history.push('/profile/'+username)
    }
    const [clipboard, copyToClipboard] = useClipboard()
    let a ='abc'
    useEffect(()=>{
        const getInfoBook = async()=>{
            try {
                const rs = await getbookAPI(idBook);
                if( rs.status === 200){
                    // console.log(rs['data']['url']);
                    setInfoBook(rs['data']['data']);
                    setUrl(rs['data']['url'])
                }
            } catch (error) {
                
            }
        };
        getInfoBook();
    },[]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div className='container-book'>
            <div className='Header'>
                <div className='logo' onClick={()=>{history.push('/')}}>
                    <img src={logo} ></img>
                </div>
                <div className='header'>
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
                        <Nav.Item>
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
                        </Nav.Item>
                        <Nav.Item>
                        {username!=''
                            ?<Nav.Link href="/logout">{t('header.signout')}</Nav.Link>
                            :<Nav.Link onClick={handleClickOpen}>{t('header.signin')}</Nav.Link>
                            }
                            {/* <Nav.Link href="/login">{t('header.signin')}</Nav.Link>
                            <Nav.Link eventKey={2} href="/register">
                            {t('header.signup')}
                            </Nav.Link> */}
                        </Nav.Item>
                    </Nav>
                </div>           
            </div>
            <Container>
                <div className='contentBook'>
                <Row>
                    <Col>
                        <Alert variant="success">
                            <img src={url} alt='logo' className='imageBook' />
                            <Button id ='wallet'variant="light" onClick={() => copyToClipboard(a)} value={infoBook.BookId}>{infoBook.BookId}
                                <p id='helpText'>Click to copy Clipboard</p></Button>
                            <Alert.Heading  style={{'font-weight':'Bold','color':'Black'}}>{infoBook.Name}</Alert.Heading>
                            <Alert.Heading style={{'font-style':'italic'}}>Country:{t(infoBook.Country)}</Alert.Heading>
                            <p>
                                {infoBook.Details}
                            </p>
                            <hr />
                            <Alert.Heading>{infoBook.Nhaxuatban}{' '}{infoBook.Ngayxuatban}</Alert.Heading>
                            
                            <Alert.Heading>Type: {t(infoBook.Type)}</Alert.Heading>
                            <p className="mb-0">
                                Amount {infoBook.Soluong} {' '}
                            </p>
                            
                            </Alert>
                        <Alert variant="success">
                            <p>
                                Detail: Aww yeah, you successfully read this important alert message. This
                                example text is going to run a bit longer so that you can see how
                                spacing within an alert works with this kind of content.
                            </p>
                            </Alert>
                    </Col>
                </Row>
                </div>
            </Container>
        </div>
    );
}