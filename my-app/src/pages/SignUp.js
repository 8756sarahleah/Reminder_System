import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {Box,Avatar ,Button,CssBaseline,Container,
  FormControl,FormHelperText,Grid,InputAdornment ,InputLabel ,IconButton, OutlinedInput ,
  TextField ,Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
////////
import { addClientThunk, getClientsThunk } from "../redux/thunks/client.thunk";
import {setMedicineUsages, setUser} from '../redux/slices/auth.slice'
////////


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  password: {
    width: '100%'
  }
}));

export default function SignUp() {

  ///////
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // יבוא של הנתונים ששמורים בסליס
  const clients = useSelector((state) => state.clients.clients);
  // הסליס של הלקוח הנוכחי
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!clients)
      dispatch(getClientsThunk());
  }, []);

  //סטייט לקלינט
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phone1:"",
    phone2:"",
    phone3:"",

  });

  //סטייט לאימות סיסמא
  const [confirmPassword, setConfirmPassword] = useState("");
  //סטייט להודעות השגיאה
  const [errorMessages, setErrorMessages] = useState(
    {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phone1:"",
      phone2:"",
      phone3:"",
    }
  )
  //סטייט האם יראו את הסיסמא או לא
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false
  });


  function handelClientChange(event) {
    const { name, value } = event.target;
    if (value === ""  && name !=="phone2"&&name!=="phone3")
      setErrorMessages({ ...errorMessages, [name]: "required" })
    else
    
      setErrorMessages({ ...errorMessages, [name]: "" })
    setClient({ ...client, [name]: value });
  }
  function handelConfirmChange(event) {
    if (event.target.value === "")
      setErrorMessages({ ...errorMessages, confirmPassword: "required" })
    else
      setErrorMessages({ ...errorMessages, confirmPassword: "" })
    setConfirmPassword(event.target.value);
  }

  const handleClickShowPassword = (key, value) => {
    setShow({ ...show, [key]: value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(event) {
    event.preventDefault();
    var isError = false;
    const errors = {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phone1:"",
      phone2:"",
      phone3:"",
    }

    //בדיקות תקינות

    //אימות סיסמה
    if (client.password !== confirmPassword) {
      errors.confirmPassword = "incorrect password verification"
      isError = true
    }
    //אם הסיסמא כבר קיימת
    var i = clients?.findIndex((c) => c.password === client.password);
    if (i !== -1) {
      console.log(i);
      errors.password = "password already exists"
      isError = true
    }

    //תקינות טלפון
    if (!/^\d+$/.test(client.phone1)) {
      errors.phone1 = "invalid phone number"
      isError = true
    }
    if (client.phone2!==""&&!/^\d+$/.test(client.phone2)) {
      errors.phone2 = "invalid phone number"
      isError = true
    }
    if (client.phone3!==""&&!/^\d+$/.test(client.phone3)) {
      errors.phone3 = "invalid phone number"
      isError = true
    }
    for (const element in client) {
      if (client[element] === "" && element!=="phone2"&&element!=="phone3") {
        errors[element] = "required"
        isError = true
      }
    }
    if (confirmPassword === "") {
      errors.confirmPassword = "required"
      isError = true
    }

    if (!isError) {
      const currentClient = await dispatch(addClientThunk(client));
      await dispatch(setUser(currentClient));
      await dispatch(setMedicineUsages(undefined));

      navigate("/clientPage");
    }
    else {
      setErrorMessages(errors);
    }
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handelClientChange}
                value={client.firstName}
                error={!!errorMessages.firstName && !client.firstName}
                helperText={!client.firstName && errorMessages.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handelClientChange}
                value={client.lastName}
                error={!!errorMessages.lastName && !client.lastName}
                helperText={!client.lastName && errorMessages.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
         
            <Grid item xs={12} >
              <FormControl className={classes.password} variant="outlined" required error={errorMessages.password !== ""} >
                <InputLabel htmlFor="password">Password </InputLabel>
                <OutlinedInput
                  onChange={handelClientChange}
                  value={client.password}
                  id="password"
                  type={show.password ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('password', !show.password)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {show.password ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  aria-describedby="password helper"
                />
                <FormHelperText id="password helper">{errorMessages.password}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.password} variant="outlined" required error={errorMessages.confirmPassword !== ""} >
                <InputLabel htmlFor="confirmPassword">Confirm Password </InputLabel>
                <OutlinedInput
                  onChange={handelConfirmChange}
                  value={confirmPassword}
                  id="confirmPassword"
                  type={show.confirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('confirmPassword', !show.confirmPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {show.confirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  autoComplete="current-password"
                  aria-describedby="confirm password helper"
                />
                <FormHelperText id="confirm password helper">{errorMessages.confirmPassword}</FormHelperText>
              </FormControl>


            </Grid>
            <Grid  container item direction="row" spacing={2} >
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={handelClientChange}
                value={client.phone1}
                error={errorMessages.phone1 !== ""}
                helperText={errorMessages.phone1}
                variant="outlined"
                required
                name="phone1"
                label="Phone1"
                id="phone1"
                autoComplete="phone1"
              />
              </Grid>
              <Grid item xs={12} sm={4}>
               <TextField
                onChange={handelClientChange}
                value={client.phone2}
                error={errorMessages.phone2 !== ""}
                helperText={errorMessages.phone2}
                variant="outlined"
                name="phone2"
                label="Phone2"
                id="phone2"
                autoComplete="phone2"
              /></Grid>
              <Grid item xs={12} sm={4} >
               <TextField
                onChange={handelClientChange}
                value={client.phone3}
                error={errorMessages.phone3 !== ""}
                helperText={errorMessages.phone3}
                variant="outlined"                
                name="phone3"
                label="Phone3"
                id="phone3"
                autoComplete="phone3"
              /></Grid>
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <nav>
                <NavLink to="/auth/signIn">have an existng accout?</NavLink>
              </nav>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}
