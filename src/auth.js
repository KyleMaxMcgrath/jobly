import axios from 'axios';

const isLoggedIn = async () => {
    try {
        let res;
        if(sessionStorage.getItem("token"))
            res = await axios.post("http://127.0.0.1:2000/auth", {"token": JSON.stringify(sessionStorage.getItem("token"))});
        else
            return false;
        if(!res) return false;
        return true;
    } catch(e) {
        return false;
    }
}

export default isLoggedIn;