import axios from "axios";
const ROOT_URL = 'http://localhost:8000/api';

export async function loginUser(dispatch, loginPayload) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await axios.post(`${ROOT_URL}/authenticate?email=${loginPayload.email}&password=${loginPayload.password}`) ;
        if (response.data.status === 200) {
            const payload = {
                userData: response.data.data,
                email: response.data.data.email,
                role: response.data.data.role, 
                isLoggedIn: true,
                msg: response.data.message
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: payload });
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("email", response.data.data.email);
            localStorage.setItem("role", response.data.data.role);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
            return response.data.data;
        } else {
            dispatch({ type: 'LOGIN_ERROR', msg: "Bad credentials"});
            return;
        }


    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', msg: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.clear();
}