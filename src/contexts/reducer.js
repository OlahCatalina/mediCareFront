import React, { useReducer } from "react";

let isLoggedIn = localStorage.getItem("isLoggedIn");
let email = localStorage.getItem("email");
let userData = localStorage.getItem("userData");

export const initialState = {
    userDetails: null || userData,
    loading: false,
    isLoggedIn: false || isLoggedIn,
    email: "" || email,
    msg: null
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                userDetails: action.payload.userData,
                email: action.payload.email,
                role: action.payload.role,
                isLoggedIn: action.payload.isLoggedIn,
                loading: false,
                msg: action.msg
            };
        case "LOGOUT":
            return {
                ...initialState,
                userData : null,
                email: "",
                isLoggedIn: false,
                role: "",
                loading: false,
                msg: ""
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                userData : null,
                isLoggedIn: false,
                email: "",
                role: "",
                loading: false,
                msg: action.msg
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};