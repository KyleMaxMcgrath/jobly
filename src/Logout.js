import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const Logout = ({loginEffect}) => {
    sessionStorage.clear();
    useEffect(loginEffect,[]);
    return <Redirect to='/'/>;
}

export default Logout;