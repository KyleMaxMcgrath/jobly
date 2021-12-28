import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect } from "react";

const Logout = ({loginEffect}) => {
    sessionStorage.clear();
    useEffect(loginEffect,[]);
    return <Redirect to='/'/>;
}

export default Logout;