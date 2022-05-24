import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/global.scss';

import './home.scss';

import { Header } from '../../components/layout/header';
import { MainButton } from '../../components/layout/mainButton';
//import trem from '../../assets/svgs/undraw_finance.svg';

export function Home() {
  return (
    <div className="home-page">
      <Header hideButton={ true }/>
      <div className="main-content">
        <section>
          <div className="headline-container">
            <h1>Acesso ao controle de  <span>Vendas</span> em um só lugar</h1>
            
            <div className="buttons-container">
            
              <Link to="/signup">
                <MainButton buttonText="Add user"/>
              </Link>
              <Link to="/signin">
                <div className='textaodoface>'>
                <MainButton  buttonText="Fazer login"/>
                </div>
              </Link>
              
            </div>
          </div>
          
        </section>
      </div>
    </div>
  );
}