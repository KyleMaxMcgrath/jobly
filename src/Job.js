import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, Container, Row, Col, NavLink, Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {NavLink as NL} from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useState } from 'react';
import "./Job.css";

const Job = ({reset, selected, uuidValue, title, company, description, salary, equity}) => {
    const history = useHistory();
    return (
        <>
            <NavLink tag={NL} exact to={`/jobs/${uuidValue}`} activeClassName='active'>
                <Card className="Job">
                <CardBody>
                    <CardTitle tag="h5">
                    {title}
                    </CardTitle>
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                    {company}
                    </CardSubtitle>
                    <CardText>
                    {description}
                    <br/>
                    <Container>
                        <Row xs="2">
                            <Col className="bg-light border">
                                Salary: {salary}
                            </Col>
                            <Col className="bg-light border">
                                Equity: {equity}
                            </Col>
                        </Row>
                    </Container>
                    </CardText>
                </CardBody>
                </Card>
            </NavLink>
            <br/>
            <Modal
                toggle={function noRefCheck(){}}
                isOpen={selected}
            >
                <ModalHeader toggle={function noRefCheck(){}}>
                {title}
                </ModalHeader>
                <ModalBody>
                <Job title="" company={company} description={description} salary={salary} equity={equity}/>
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={()=>{alert("You've applied to this job!"); reset(); } }
                >
                    Apply
                </Button>
                {' '}
                <Button onClick={reset}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Job;