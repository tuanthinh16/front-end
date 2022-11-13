import React from 'react'
import styled from 'styled-components'
import { Trans,useTranslation,Translation  } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <div className='container-footer'>
        <div className='f1'>
          <h1>{t('Footer.about')}</h1>
          <hr/>
          <p>{t('Footer.about-content')}</p>
        </div>
        <div className='f2'>
          <h1>{t('Footer.contact')}</h1>
          <hr/>
          <p>Email: tuanthinhdz@gmail.com</p>
          <p>Phone: 0335833737</p>
          <p>Address: 566 Núi Thành,Hòa Cường Nam, Hải Châu, Đà Nẵng</p>
        </div>
        <div className='f3'>
          <h1>{t('Footer.help')}</h1>
          <hr/>
          <p>{t('Footer.help-content')}<a href='#'>{t('Footer.help-center')}</a></p>
        </div>
      </div>
    </Wrapper>
  )
}
export const Wrapper = styled.div`
    .container-footer{
      display: flex;
      background-color: rgb(95, 112, 163);
      position: absolute;
      min-width: 100%;
      padding: 10px;
      .f1{
        min-width: 20rem;
        max-width: 35%;
        border-right: 1px solid black;
        padding: 20px;
      }
      .f2{
        min-width: 20rem;
        max-width: 35%;
        border-right: 1px solid black;
        padding: 20px;
      }
      }
      .f3{
        min-width: 20rem;
        max-width: 30%;
        /* border-right: 1px solid black; */
        padding: 20px;
        a{
          text-decoration: none;
          color:black;
        }
        a:hover{
          color:green;
        }
      }
    
`
