import React, { Component, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';

const Signup = () => {
  const { t: translate } = useTranslation('common');
  const [state, setState] = useState({
    signupData: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "PATIENT",
      isLoading: "",
    },
    msg: "",
  });

  const [userData, setUserData] = useState({ });

  const onChangehandler = (e, key) => {
    const { signupData } = state;
    signupData[e.target.name] = e.target.value;
    setState({ signupData });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/register", state.signupData)
      .then((response) => {
        setState({ isLoading: false });
        if (response.data.status === 200) {
          setState({
            msg: response.data.message,
            signupData: {
              name: "",
              email: "",
              phone: "",
              password: ""
            },
          });
          setTimeout(() => {
            setState({ msg: "" });
          }, 2000);
        }

        if (response.data.status === "failed") {
          setState({ msg: response.data.message });
          setTimeout(() => {
            setState({ msg: "" });
          }, 2000);
        }
      });
  };


  const isLoading = state.isLoading;

  return (
    <div>
      <Form className="containers shadow">
        <FormGroup>
          <Label for="name">{translate("name")}</Label>
          <Input
            type="name"
            name="name"
            placeholder={translate("namePlaceholder")}
            value={state.signupData.name}
            onChange={onChangehandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">{translate("email")}</Label>
          <Input
            type="email"
            name="email"
            placeholder={translate("emailPlaceholder")}
            value={state.signupData.email}
            onChange={onChangehandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">{translate("phoneNumber")}</Label>
          <Input
            type="phone"
            name="phone"
            placeholder={translate("phonePlaceholder")}
            value={state.signupData.phone}
            onChange={onChangehandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">{translate("password")}</Label>
          <Input
            type="password"
            name="password"
            placeholder={translate("passwordPlaceholder")}
            value={state.signupData.password}
            onChange={onChangehandler}
          />
        </FormGroup>
        <p className="text-white">{state.msg}</p>
        <Button
          className="text-center mb-4"
          color="success"
          onClick={onSubmitHandler}
        >
          {translate("signUp")}
            {isLoading ? (
            <span
              className="spinner-border spinner-border-sm ml-5"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <span></span>
          )}
        </Button>
        <Link to="/register" className="text-white ml-5">{translate("alreadyMember")}</Link>
      </Form>
    </div>
  );

}

export default Signup;