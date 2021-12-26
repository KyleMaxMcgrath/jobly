import Job from "./Job";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const JobList = ({loggedIn}) => {
    const history = useHistory();

    const [jobData, setJobData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [modals, setModals] = useState({});
    const {uuidSelected} = useParams();

    useEffect(async () => {
        if(!loggedIn) return;
        const res = await axios.post('http://127.0.0.1:2000/joblist', {"token": JSON.stringify(sessionStorage.getItem("token"))});
        setJobData(jobData => {

            for(let key of res.data.keys())
                res.data[key].uuid = uuid();
            return res.data;
        });
    }, []);

    useEffect(async () => {
        if(!loggedIn) return;
        const res = await axios.post('http://127.0.0.1:2000/auth/admin', {"token": JSON.stringify(sessionStorage.getItem("token"))});
        const success = res.data.status==="SUCCESS";
        setIsAdmin(isAdmin=>success);
    }, [])

    const reset = () => {
        history.push('/jobs/all');
    }
    
    if(!loggedIn) 
        return <Redirect to='/login'></Redirect>;

    return (
        <>
            { 
                isAdmin ?
                <Button onClick={()=>{history.push('/postjob')}}>Post Job</Button> :
                <p>Login as an admin to post jobs</p>
            }
            <br/>
            {
                jobData.map(item => {
                    return (
                        <Job reset={reset} selected={item.uuid === uuidSelected} uuidValue={item.uuid} key={item.uuid} title={item.title} company={item.company} description={item.description} salary={item.salary} equity={item.equity}/>
                    )
                })
            }
        </>
    )
}

export default JobList;