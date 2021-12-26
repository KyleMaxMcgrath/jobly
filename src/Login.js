
import 'bootstrap/dist/css/bootstrap.css';
import { Form, InputGroup, Input, Label, Button, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Login.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({loginEffect, loggedIn}) => {

    
        
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    
    if(loggedIn) 
        return <Redirect to='/jobs/all'></Redirect>;

    const onChange = (e) => {
        setFormData(data => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const goToRegister = () => {
        history.push('/register');
    };

    const login = async (e) => {
      e.preventDefault();
      const res = await axios.post('http://127.0.0.1:2000/login', formData);
      if(!res) {
        alert('Internal server error')
      }
      console.log(res.data);
      if(res.data) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", formData.username);
      }
      loginEffect();
      history.push('/');
    };

    return (
        <Form className='Login' onSubmit={login}>
          <h1>Login</h1>
          <br/>
          <InputGroup>
            <Label className='Login-Label' htmlFor="username">Username: </Label>
            <Input className='Login-Input' id='username' name='username' type='text' value={formData.username} onChange={onChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <Label className='Login-Label' htmlFor="password">Password: </Label>
            <Input className='Login-Input' id='password' name='password' type='password' value={formData.password} onChange={onChange}/>
          </InputGroup>
          <br/>
          <Button>Login</Button>
          <nbsp> </nbsp>
          <Button onClick={goToRegister}>Register</Button>
        </Form>
    );
}

export default Login;