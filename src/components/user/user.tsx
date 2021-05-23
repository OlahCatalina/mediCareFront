import { useTranslation } from "react-i18next";
import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Appointments from "./aappointments-list";

const User = () => {
  const { t: translate } = useTranslation('common');
  const [state, setState] = useState({
    signupData: {
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
    },
    msg: "",
    isLoading: false
  });
  const isLoading = state.isLoading;

  useEffect(() => {
    const userData = localStorage.getItem('email');
    if (userData) {
      axios
        .get(`http://localhost:8000/api/user/${userData}`)
        .then((response) => {
          setState({ ...state, isLoading: true });

          setState({
            ...state, signupData: {
              id: response.data.id,
              name: response.data.full_name,
              phone: response.data.phone,
              role: response.data.role,
              email: response.data.email
            }, isLoading: false
          })

        });
    }

  }, []);

  const onChangehandler = (e: any) => {
    let { signupData } = state as any;
    signupData[e.target.name] = e.target.value;
    setState({ ...state, signupData: signupData });
  };

  const onSubmitHandler = () => {
    console.log(state);
    setState({ ...state, isLoading: true });
    axios
      .put(`http://localhost:8000/api/user-update/${state.signupData.id}`, {
        name: state.signupData.name,
        email: state.signupData.email,
        phone: state.signupData.phone,
        role: state.signupData.role
      })
      .then((response) => {
        setState({ ...state, isLoading: false });

        setState({
          msg: response.data.message,
          signupData: {
            id: response.data.id,
            name: response.data.full_name,
            email: response.data.email,
            phone: response.data.phone,
            role: response.data.role
          },
          isLoading: false
        });

      });
  }

  return (
    state.signupData && <div>
      <Form className="containers shadow">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            name="name"
            placeholder="Enter name"
            value={state.signupData.name}
            onChange={onChangehandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email id</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={state.signupData.email}
            onChange={onChangehandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input
            name="phone"
            placeholder="Enter phone number"
            value={state.signupData.phone}
            onChange={onChangehandler}
          />
        </FormGroup>
        <p className="text-white">{state.msg}</p>
        <Button
          className="text-center mb-4"
          color="info"
          onClick={onSubmitHandler}
        >
          Save
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
      </Form>
      { state.signupData.id && <Appointments
        id={state.signupData.id}
      />}

    </div>
  );
}


export default User;