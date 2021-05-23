import React, { useEffect, useRef, useState } from "react";
import DoctorAppointmentsPage from "./doctor-appoinmtments";
import axios from "axios";

const DoctorPage = () => {

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

    return (
        <div>
            {state.signupData.id && <DoctorAppointmentsPage  id={state.signupData.id} />}
        </div>
    )
}

export default DoctorPage;
