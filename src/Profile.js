import {Form, Input, Card, CardTitle, CardBody, Container, Row, Col, Button} from 'reactstrap';
import './Profile.css';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';

const Profile = ({loggedIn}) => {

    const INITIAL_DATA = {
        'username': '',
        'newPassword': '',
        'email': '',
        'name': '',
        'oldPassword': '',
    };

    const history = useHistory();
    const [formData, setFormData] = useState(INITIAL_DATA);

    const loadProfile = async () => {
        if(!loggedIn) return;
        const res = await axios.post('http://127.0.0.1:2000/profile', {"token": JSON.stringify(sessionStorage.getItem("token"))});
        setFormData(formData=>({...formData, 'username': res.data.username, 'email': res.data.email, 'name': res.data.name}))
    };

    React.useEffect(loadProfile, []);
    
    if(!loggedIn) 
        return <Redirect to='/login'></Redirect>;

    const onChange = (e) => {
        setFormData(formData => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(0);
        const res = await axios.post('http://127.0.0.1:2000/profile/update', {"token": JSON.stringify(sessionStorage.getItem("token")), ...formData});
        console.log(1);
        if(res.data.status === 'FAILURE') {
            console.log(2);
            if(res.data.reason === 'bad password')
                alert("Wrong password!");
            else
                alert("Error updating password");
        }
        console.log(3);
        setFormData(formData=>(INITIAL_DATA));
        console.log(4);
        loadProfile();
        console.log(5);
        history.push('/profile');
        console.log(6);
    };

    return (
        <Card className="Profile">
            <CardTitle><h1>Profile</h1></CardTitle>
            <CardBody>
                <Form onSubmit={onSubmit}>
                    <Input disabled id="username" name="username" className="Profile-Input" type="text" placeholder="username" onChange={onChange} value={formData.username}/>
                    <Input id="newPassword" name="newPassword" className="Profile-Input" type="password" placeholder="new password (leave blank to leave unchanged)" onChange={onChange} value={formData.newPassword}/>
                    <Input id="name" name="name" className="Profile-Input" type="text" placeholder="name" onChange={onChange} value={formData.name}/>
                    <Input id="email" name="email" className="Profile-Input" type="text" placeholder="email" onChange={onChange} value={formData.email}/>
                    <Input id="oldPassword" name="oldPassword" className="Profile-Input" type="password" placeholder="current password to verify" onChange={onChange} value={formData.oldPassword}/>
                    <Container>
                        <Row xs={3}>
                            <Col></Col>
                            <Col>
                                <Button>
                                    Submit
                                </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Profile;