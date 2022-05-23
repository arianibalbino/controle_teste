
// import { Link } from 'react-router-dom';
import '../../assets/styles/global.scss';

import './signUpPage.scss';

import React, { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { Header } from '../../components/layout/header';
import { SignUpForm } from '../../components/forms/signupform';
import { useAuth } from '../../contexts/Auth';

export function SignUpPage() {
  const { authorizationBearer } = useAuth();
  
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get('/SignUpPage', { 
          headers: { Authorization: authorizationBearer() } 
        });



      } catch(error) {
        console.log(error);
        return error.response;
      }
    }

  }, [authorizationBearer]);

  return (
    <div>
      <Header hideButton={ true }/>
      <div className="form-container">
        <SignUpForm />
      </div>
    </div>
  );
}