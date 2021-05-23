import React from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";


export default function PrivateRouteForLoggedUsers({children, ...rest}){
    return (
      <Route 
        {...rest}
        render={({location}) => 
          localStorage.getItem("isLoggedIn") ? (children) 
            :
            (<Redirect
                to="/register"
            />)
        }
        />  
    );
}
