import React from "react";
import { useHistory } from "react-router-dom";
import { loginUser, useAuthState, useAuthDispatch } from '../../contexts';
import './register.css';
import { Button, Label, Input } from "reactstrap";
import { useTranslation } from 'react-i18next';

export const Signin = () => {
  const { t: translate } = useTranslation('common');
  const dispatch = useAuthDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const { loading, msg } = useAuthState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response = await loginUser(dispatch, { email, password });
      console.log(response);
      if (!response) return;
      if (response.role === "PATIENT") {
        history.push('/user');
      }else{
        history.push('/doctor');
      }
    } catch (error) {
      
    }
  };

  return (
      <div className="container">
      <div className={{ width: 200 }}>
        <h1>{translate("loginPage")}</h1>
        {
          msg ? <p className="error">{msg}</p> : null
        }
        <form >
          <div className="loginForm">
            <div className="loginFormItem">
              <Label htmlFor="email">{translate("username")}</Label>
              <Input type="text" id='email' value={email} 
                onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            </div>
            <div className="loginFormItem">
              <Label htmlFor="password">{translate("password")}</Label>
              <Input type="password" id='password' value={password} 
                onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            </div>
          </div>
          <Button onClick={handleLogin} disabled={loading}>{translate("login")}</Button>
        </form>
      </div>
    </div>
  )

}

export default Signin;