import React, { Component,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import logo from '../images/logo.png';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import '../css/addbook.css';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import i18n from '../../translation/i18n';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MDBIcon } from 'mdb-react-ui-kit';
import {postAPI} from '../service/api';
import {useSnackbar} from 'notistack';

const AddAPI =(data)=>{
    return postAPI("/add-book",data);
}
export default function AddBook(){
    const {enqueueSnackbar} = useSnackbar();
    let idBook = Math.round((new Date()).getTime() / 1000);
    const { t } = useTranslation();
    const history = createBrowserHistory({
        forceRefresh: true
    });

    /// value 
    const [info,setInfo] = useState({idBook:'',name:'',type:'',detail:'',country:'',amount:'',nxb:'',datexb:''});
    const onValueChange_name = (e)=>{
        setInfo(prev =>({...prev, name:e.target.value}));
        console.log("co ten")
    }
    const onValueChange_type = (e)=>{
        setInfo(prev =>({...prev, type:e.target.value}));
        console.log("co type")
    }
    const onValueChange_detail = (e)=>{
        setInfo(prev =>({...prev, detail:e.target.value}));
        console.log("co detail")
    }
    const onValueChange_country = (e)=>{
        setInfo(prev =>({...prev, country:e.target.value}));
        console.log("co country")
    }
    const onValueChange_amount = (e)=>{
        setInfo(prev =>({...prev, amount:e.target.value}));
        console.log("co amount")
    }
    const onValueChange_nxb = (e)=>{
        setInfo(prev =>({...prev, nxb:e.target.value}));
        console.log("co nxb")
    }
    const onValueChange_datexb = (e)=>{
        setInfo(prev =>({...prev, datexb:e.target.value}));
        console.log("co datexb")
    }
    /// file upload
    const [selectedImages, setSelectedImages] = useState([]);
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    };
    console.log("Image new:",selectedImages);
    const onADD = async ()=> {
        const data = new FormData();
        data.append('id',idBook);
        data.append('name',info.name);
        data.append('type',info.type);
        data.append('detail',info.detail);
        data.append('country',info.country);
        data.append('nxb',info.nxb);
        data.append('date',info.datexb);
        data.append('sl',info.amount);
        data.append('fileIMG',setSelectedImages);
        try {
            const rs = await AddAPI(data);
            if(rs.status ===200){
                enqueueSnackbar("Sucessfully",{variant:'success'});
                history.push('/')
            }
            let fileToUpload = selectedImages
            fileToUpload.map((file) => {
                const formData = new FormData()
                formData.append('fileIMG', file);
                formData.append('id', idBook);
                console.log("file", selectedImages);
                return axios
                    .post('http://127.0.0.1:443/api/book/add-image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(res => {
                        console.log(res)
                        return res
                    });
                })
        } catch (errors) {
            console.log(errors.message);
        }
    }
    return(
        <div id='mainctn'>
            <Container id='addbookContainer'>
                <Row>
                    <Col xs={2}><img src={logo}
                        style={{width: '185px'}} alt="logo" onClick={()=>history.push('/')}/>
                    </Col>
                    <Col xs = {8}><h1 style={{'textAlign':'center'}}>{t('book.header')}</h1></Col>
                    <Col xs = {2}>
                    <NavDropdown id="nav-dropdown-dark-example"title={t('menu.language')} menuVariant="light">
                            <NavDropdown.Item onClick={()=>i18n.changeLanguage('vi')}>{t('menu.lan-vi')}<MDBIcon flag='france' /></NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>i18n.changeLanguage('en')}>{t('menu.lan-en')}</NavDropdown.Item>
                    </NavDropdown>
                    </Col>
                </Row>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>{t('book.name')}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Book Name" onChange={onValueChange_name}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridType">
                    <Form.Label>{t('book.type')}</Form.Label>
                    <Form.Select defaultValue="Choose..." onChange={onValueChange_type}>
                        <option value='cate-action'>{t('menu.categories-action')}</option>
                        <option value='cate-art'>{t('menu.categories-art')}</option>
                        <option value='cate-business'>{t('menu.categories-business')}</option>
                        <option value='cate-computer'>{t('menu.categories-computer')}</option>
                        <option value='cate-history'>{t('menu.categories-history')}</option>
                        <option value='cate-entertainment'>{t('menu.categories-entertainment')}</option>
                        <option value='cate-sport'>{t('menu.categories-sport')}</option>
                        <option value='cate-travel'>{t('menu.categories-travel')}</option>
                        <option value='cate-teen'>{t('menu.categories-teen')}</option>
                        <option value='cate-other'>{t('menu.categories-other')}</option>
                    </Form.Select>
                    </Form.Group>
                    
                </Row>

                <Form.Group className="mb-3" controlId="formGridDetail">
                    <Form.Label>{t('book.detail')}</Form.Label>
                    <Form.Control placeholder="Somthing about your book..." onChange={onValueChange_detail}/>
                </Form.Group>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCountry">
                    <Form.Label>{t('book.country')}</Form.Label>
                    <Form.Select defaultValue="Choose..." onChange={onValueChange_country}>
                        <option value='country-vn'>{t('menu.lan-vi')}</option>
                        <option value='country-france'>{t('menu.country-france')}</option>
                        <option value='country-usa'>{t('menu.country-usa')}</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group  as={Col}>
                    <Form.Label>{t('book.sl')}</Form.Label>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"></InputGroup.Text>
                        <Form.Control
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={onValueChange_amount}
                        />
                    </InputGroup>
                    </Form.Group>
                    </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNXB">
                    <Form.Label>{t('book.nxb')}</Form.Label>
                    <Form.Control onChange={onValueChange_nxb}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDatXB">
                    <Form.Label>{t('book.date-xb')}</Form.Label>
                    <Form.Control onChange={onValueChange_datexb}/>
                    </Form.Group>
                    
                </Row>
                <Form.Group className="mb-3">
                <Form.Label>File</Form.Label>
                    <Form.Control
                    type="file"
                    required
                    name="file"
                    onChange={onSelectFile}
                    />
                </Form.Group>
                {/* <CloudinaryContext cloudName="dwweabf16">
                    <div>
                        <Image publicId="sample" width="50" />
                    </div>
                    <Image publicId="sample" width="0.5" />
                    </CloudinaryContext> */}
                <Button variant="primary" onClick={onADD}>
                    Submit
                </Button>
                </Form>
                </Container>
        </div>
    );
}