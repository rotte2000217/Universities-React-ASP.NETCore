import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Styles/Register.css";
import endpoints from "../ApiEndpoints";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  let history = useHistory();
  
  function validateForm() {
    return userName.length > 0 && password.length >= 6 && email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userFormData = { userName, email, password };

    fetch(endpoints.registerPage, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userFormData)
    }).then((response) => {
        return response.json();
    })
    .then((response) => {
        if(response.statusCode === 200){
          history.push("/login");
        }
        else{
          setResult(response.value);
        }
    })
  }

  return (
    <div className="Register">
      <h1>Register</h1>
      <h3>{result}</h3>
      <Form onSubmit={handleSubmit}>
        <p>Your password should be atleast 6 characters long</p>
        <Form.Group size="lg" controlId="username">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={email}
            type={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Create Account
        </Button>
      </Form>
    </div>
  );
}