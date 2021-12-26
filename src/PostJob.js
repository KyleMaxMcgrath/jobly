import {InputGroup, Input, InputGroupText, Card, CardTitle, Form, Button, Container, Row, Col} from 'reactstrap';
import './PostJob.css';
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from 'react';
import axios from 'axios';

const PostJob = ({loggedIn}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        'title': '',
        'company': '',
        'description': '',
        'salary': 0,
        'equity': 0
    });
    
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
        const res = await axios.post('http://127.0.0.1:2000/jobs', {...formData, "token": JSON.stringify(sessionStorage.getItem("token"))});
        if(!res) {
            alert('Error posting job.\nMy apologies.');
            return;
        }
        history.push('/');
    };

    if(!loggedIn) 
        return <Redirect to='/login'></Redirect>;
    return (
        <Card className="PostJob">
            <CardTitle><h1>Post a Job</h1></CardTitle>
            <Form onSubmit={onSubmit}>
                <InputGroup className="PostJob-InputGroup">
                    <Input id="title" name="title" type="text" placeholder="Title" onChange={onChange} value={formData.title}/>
                </InputGroup>
                <InputGroup className="PostJob-InputGroup">
                    <Input id="company" name="company" type="text" placeholder="Company" onChange={onChange} value={formData.company} />
                </InputGroup>
                <InputGroup className="PostJob-InputGroup">
                    <Input id="description" name="description" className="PostJob-textarea" type="textarea" placeholder="Description" onChange={onChange} value={formData.description} />
                </InputGroup>
                <InputGroup className="PostJob-InputGroup">
                    <InputGroupText>
                    $
                    </InputGroupText>
                    <Input id="salary" name="salary" type="number" placeholder="Salary" onChange={onChange} value={formData.salary}/>
                </InputGroup>
                <InputGroup className="PostJob-InputGroup">
                    <InputGroupText>
                    %
                    </InputGroupText>
                    <Input id="equity" name="equity" type="decimal" placeholder="Equity" onChange={onChange} value={formData.equity} />
                </InputGroup>
                <Container>
                    <Row xs={3}>
                        <Col></Col>
                        <Col>
                            <Button>
                                Post
                            </Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Form>
        </Card>
    )
}

export default PostJob;