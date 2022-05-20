import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import "./Styles/Navigation.css";

export default function Navigation(props){
    function handleLogout(){
        localStorage.removeItem('token');
        props.setIsUserLoggedIn("false");
        window.location.reload(false);
}
        return(
            <Navbar bg="dark" expand="xl">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white nav-button" to="/">
                            Home
                        </NavLink>

                        {props.isUserLoggedIn === 'true' &&
                         <NavLink className="d-inline p-2 bg-dark text-white nav-button" to="/watchlist">
                            Watchlist
                          </NavLink>
                        }

                        {
                                props.isUserLoggedIn === 'true'
                            ?
                            <button onClick={handleLogout} className="d-inline p-2 bg-dark text-white nav-button-2 logout-btn auth-btns">
                                Logout
                            </button>
                            
                            :
                            <>
                                <NavLink className="d-inline p-2 bg-dark text-white nav-button auth-btns" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="d-inline p-2 bg-dark text-white nav-button auth-btns" to="/register">
                                    Register
                                </NavLink>
                            </>
                        }
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
        );
}