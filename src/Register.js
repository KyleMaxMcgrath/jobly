import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, InputGroup, Input, Label, Button, NavLink } from 'reactstrap';
import './Register.css';
import axios from 'axios';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Register = ({loggedIn}) => {


    const history = useHistory();

    const [formData, setFormData] = useState({
        email: "",
        name: "",
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
    }

    const register = async (e) => {
        e.preventDefault();
        console.log(formData);
        const res = await axios.post('http://127.0.0.1:2000/register', formData);
        if(!res) {
          alert("Internal server error!");
        } else if(res.data == 'Username taken') {
          alert('This username has been taken');
          return;
        }
        alert(`You have successfully registered.\nWelcome ${formData.username}!`)

        history.push('/');
    }

    return (
    <Form className='Register' onSubmit={register}>
    <h1>Register</h1>
    <br/>
    <InputGroup>
      <Label className='Register-Label' htmlFor="email">Email: </Label>
      <Input className='Register-Input' id='email' name='email' type='text' onChange={onChange}/>
    </InputGroup>
    <br/>
    <InputGroup>
      <Label className='Register-Label' htmlFor="name">Name: </Label>
      <Input className='Register-Input' id='name' name='name' type='text' onChange={onChange}/>
    </InputGroup>
    <br/>
    <InputGroup>
      <Label className='Register-Label' htmlFor="username">Username: </Label>
      <Input className='Register-Input' id='username' name='username' type='text' onChange={onChange}/>
    </InputGroup>
    <br/>
    <InputGroup>
      <Label className='Register-Label' htmlFor="password">Password: </Label>
      <Input className='Register-Input' id='password' name='password' type='password' onChange={onChange}/>
    </InputGroup>
    <br/>
    <Button>Register</Button>
  </Form>
    );
}

export default Register;