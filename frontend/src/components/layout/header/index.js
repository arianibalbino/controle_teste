import React from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/styles/global.scss';
import './header.scss';
import { RectangularButton } from '../rectangularButton';
import { useAuth } from '../../../contexts/Auth';
import logo from '../../../assets/svgs/logo-remove.png';
import bota from '../../../assets/svgs/logout_icon.png'

export function Header({ hideButton }) {
  const { handleSignOut } = useAuth();
  return (
    <header className="header">
        <div className="header__logo">
          <Link to="/">
            <img 
            src={logo}
            />
          </Link>
        </div>
        <Link to="/">
            <RectangularButton onClickEffect={ handleSignOut } buttonText="Logout" hide={ hideButton }/>
        </Link>
    </header>  
  )
}