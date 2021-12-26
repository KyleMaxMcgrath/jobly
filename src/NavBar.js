import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import {NavLink as NL} from 'react-router-dom';
import './NavBar.css'

const NavBar = ({loggedIn}) => {
    const [isOpen, setIsOpen] = useState(false);
    let style = {};
    console.log(loggedIn);
    if(isOpen)
      style['marginLeft'] = "-150px";
    return (
      <Navbar
        color="light"
        expand="md"
        light
        className='NavBar'
      >
        <NavbarBrand to="/">
          Jobly
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck(){setIsOpen(open=>!open);}} />
        <Collapse navbar isOpen={isOpen}>
        <Nav style={style} vertical={isOpen}>
          <NavItem>
            <NavLink tag={NL} exact to="/" activeClassName='active'>
              Home
            </NavLink>
          </NavItem>
          {
            loggedIn ?
            <>
              <NavItem>
                <NavLink tag={NL} exact to="/jobs/all" activeClassName='active'>
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem>
              <NavLink tag={NL} exact to="/profile" activeClassName='active'>
                Profile
              </NavLink> 
              </NavItem>
              <NavItem>
              <NavLink tag={NL} exact to="/logout" activeClassName='active'>
                Logout
              </NavLink> 
              </NavItem>
            </>:
            <>
              <NavItem>
                <NavLink tag={NL} exact to="/login" activeClassName='active'>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NL} exact to="/register" activeClassName='active'>
                  Register
                </NavLink>
              </NavItem>
            </>

            }
        </Nav>
        </Collapse>
      </Navbar>
    )
  };

  export default NavBar;