import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useAuthDispatch, logout, useAuthState } from '../../contexts/index';
import "./Navbar.css";

export const Navbar2 = () => {

    const { t, i18n } = useTranslation('common');
    const dispatch = useAuthDispatch();
    const authState = useAuthState();

    const history = useHistory();
    const changeLang = () => {
        sessionStorage.setItem("lang", "ro");
        i18n.changeLanguage('ro');
    }

    const changeLang2 = () => {
        sessionStorage.setItem("lang", "en");
        i18n.changeLanguage('en');
    }
    const logOut = () => {
        logout(dispatch);
        history.push('/home')
    }

    return (

        <><Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/">MediCare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {!authState.isLoggedIn &&  <Nav.Link as={Link} to="/register">{t("login")}</Nav.Link>}
                    {!authState.isLoggedIn && <Nav.Link as={Link} to="/auth">{t("register")}</Nav.Link>}
                    {authState.isLoggedIn && authState.role === "PATIENT" && <Nav.Link as={Link} to="/user">{t("user")}</Nav.Link>}
                    {authState.isLoggedIn && authState.role === "DOCTOR" && <Nav.Link as={Link} to="/doctor">{t("doctor")}</Nav.Link>}
                </Nav>
                <NavDropdown title="Language" id="nav-dropdown" className="white">
                    <NavDropdown.Item onClick={changeLang}>{t("romanian")}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={changeLang2} >{t("english")}</NavDropdown.Item>
                </NavDropdown>
                {authState.isLoggedIn && <Button className="submit-btn" onClick={logOut}>{t("logout")}</Button>}
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}

export default Navbar2;