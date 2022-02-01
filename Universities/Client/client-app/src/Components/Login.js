import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Styles/Login.css";
import endpoints from "../ApiEndpoints";
import authService from "../Services/AuthService";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userFormData = {userName, password};

    fetch(endpoints.loginPage, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userFormData)
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if(response.statusCode === 200){
            let token = response.value;
            authService.SetToken(token);
        }
        else{
            setResult(response.value);
        }
    })
  }

  return (
    <div className="Login">
        <h1>Login</h1>
        <h3>{result}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}