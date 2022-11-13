import React, { Component, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
import {postAPI} from '../service/api.js';
import {useSnackbar} from 'notistack';


import logo from '../images/logo.png';
import { createBrowserHistory } from 'history';
import '../css/register.css';

const registerAPI = (data) =>{
  return postAPI("/register", data);
}
export default function Register(){
  const {enqueueSnackbar} = useSnackbar();
  const [info,setInfo] = useState({fullname:"",username: "", password: "",email:""})
  const history = createBrowserHistory({
      forceRefresh: true
  });
  const onValueChange_Fullname =(e)=>{
    setInfo(prev=>({...prev,fullname:e.target.value}))
  }
  const onValueChange_Username =(e)=>{
    setInfo(prev=>({...prev,username:e.target.value}))
  }
  const onValueChange_Password =(e)=>{
    setInfo(prev=>({...prev,password:e.target.value}))
  }
  const onValueChange_Email =(e)=>{
    setInfo(prev=>({...prev,email:e.target.value}))
  }
  const onCreate = async ()=>{
    const data = new FormData();
    data.append('fname',info.fullname);
    data.append('username',info.username);
    data.append('email',info.email);
    data.append('password',info.password);
    try{
      const rs = await registerAPI(data);
      console.log(rs);
      enqueueSnackbar("Create Sucessfully ! Login now...",{variant:'success'});
      history.push("/login");
    }catch(err){
      console.error(err);
      enqueueSnackbar("Login Fail. Try Again !!",{variant:'error'});
    }
    
  }
    return(
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='5' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <div className="text-center">
                <img src={logo} alt="logo" id='imgreg'onClick={()=>history.push('/')}/>
            </div>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)','text-align':'center'}}>
                Best Choose<br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>for your wonderful experiences </span>
            </h1>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5-bg-glass'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Full name' id='form1' type='text' onChange={onValueChange_Fullname}/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Username' id='form2' type='text'onChange={onValueChange_Username}/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'onChange={onValueChange_Email}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'onChange={onValueChange_Password}/>

              <MDBBtn className='w-100 mb-4' size='md' onClick={onCreate}>sign up</MDBBtn>
            </MDBCardBody>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Have an account ?</p>
              <MDBBtn outline className='mx-2' color='danger' onClick={()=>history.push('/login')}>
                Login now
              </MDBBtn>
            </div>
          </MDBCard>
          
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    );
}