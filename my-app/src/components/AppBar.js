import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5)
  },
//   activeLink:    {

//     color: 'white',
//     fontWeight: 'bold',
//     fontSize:"20px",
//     textDecoration: 'none'
// },
//   inactivelink:{ color: 'white', textDecoration: 'none',   fontSize:"20px" }
  
}));

export default function ButtonAppBar() {

  const classes = useStyles();
  const auth = useSelector(state => state.auth)
 
  
  return (
    <div className={classes.root}>
    
      <AppBar position="fixed" >
        <Toolbar>
           {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>  */}
          <Typography variant="h6" align="left" className={classes.title}>
           {auth.user?`Hi ${auth.user.firstName}`:"Welcome To The Reminder Platform !!"}
            </Typography>
          
          <nav > 
           
                       <NavLink to={"/auth/signIn"}
                                  style={({ isActive }) =>(
                                    {   color: isActive?'pink':'white',
                                      fontWeight:isActive? 'bold':'unset',
                                      fontSize:"20px",
                                      textDecoration: 'none',
                                      fontFamily:"revert"}) }
                          >Sign In</NavLink>
                              {' '}
                          <NavLink  to={"/auth/signUp"} 
                                        style={({ isActive }) =>(
                                          {  color: isActive?'pink':'white',
                                            fontWeight:isActive? 'bold':'unset',
                                            fontSize:"20px",
                                            textDecoration: 'none',
                                            fontFamily:"revert"}) }  
                          >Sign Up</NavLink>
         
          
          </nav>
         
        </Toolbar>
      </AppBar>
        
    </div>
  );
}