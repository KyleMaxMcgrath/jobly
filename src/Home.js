

const Home = ({loggedIn}) => {

    return ( 
        <>
        {
            loggedIn ?
            <h1> Welcome {sessionStorage.getItem("username")}!</h1> :
            <h1> Please login to view and apply to jobs! </h1>
        
        }
        </>
    )
}

export default Home;