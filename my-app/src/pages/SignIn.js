import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { FormHelperText, Paper,Avatar ,Button,CssBaseline,Container,
  FormControl,Grid,InputAdornment ,InputLabel ,IconButton, OutlinedInput ,
  TextField ,Typography} from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

/////
import { getClientsThunk } from '../redux/thunks/client.thunk'
import { getMedicineUsageByIdThunk } from '../redux/thunks/medicineUsage.thunk'
import { setUser } from '../redux/slices/auth.slice'
/////

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
  width100: {
    width: '100%'
  }
  

}));


export default function LogIn() {

  /////
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // יבוא של הנתונים ששמורים בסליס
  const clients = useSelector(state => state.clients.clients)
  // הסליס של הלקוח הנוכחי
  const auth = useSelector(state => state.auth)
  //סטייט להודעות השגיאה
  const [errorMessages, setErrorMessages] = useState(
    {
      firstName: "",
      lastName: "",
      password: "",
    }
  )
  //סטייט האם יראו את הסיסמא או לא
  const [showPassword, setShowPassword] = useState(false);

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!clients) {
      dispatch(getClientsThunk())
    }
  }, [])

  const [form, setForm] = useState({ firstName: '', lastName: '', password: '' })

  function handelChange(event) {
    const { name, value } = event.target
    if(value===""){
      setErrorMessages({ ...errorMessages, [name]: "required" })
    }else
    if (name === "password") 
        setErrorMessages({ ...errorMessages, password: "" })
    setForm({ ...form, [name]: value })
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  async function handelSubmit(event) {

    event.preventDefault();
    var isError_ = false;
    const errors = {
      firstName: "",
      lastName: "",
      password: ""
    }

    //בדיקות אם כל השדות מלאים
    for (const element in form) {
      if (form[element] === "") {
        errors[element] = "required"
        isError_ = true
      }
    }

    if (!isError_) {
      // בדיקה אם הלקוח קיים
      var currentClient = clients?.find(c => c.firstName === form.firstName && c.lastName === form.lastName && c.password === form.password)
      if (currentClient) {
         dispatch(setUser(currentClient))
         await dispatch(getMedicineUsageByIdThunk(currentClient.id))
        navigate('/clientPage')
      }
      else {
        setIsError(true)
      }
    }
    setErrorMessages(errors)
  }

  /////
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
 
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {isError ?
          <Alert className={classes.width100} ariant="outlined" severity="error">
            client does not exist — check it out!
          </Alert> : ''}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.firstName}
                error={!!errorMessages.firstName && !form.firstName}
                helperText={!form.firstName && errorMessages.firstName}
                onChange={handelChange}
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
                value={form.lastName}
                onChange={handelChange}
                error={!!errorMessages.lastName && !form.lastName}
                helperText={!form.lastName && errorMessages.lastName}
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
              <FormControl className={classes.width100} variant="outlined" required error={errorMessages.password !== ""} >
                <InputLabel htmlFor="password" >Password</InputLabel>
                <OutlinedInput
                  onChange={handelChange}
                  value={form.password}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
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
                <FormHelperText focused id="password helper" >{errorMessages.password}</FormHelperText>
              </FormControl>
            </Grid>


          </Grid>

          <Button
            onClick={handelSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <nav>
                <NavLink to="/auth/signUp">don't have an account ? create one </NavLink>
              </nav>

            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}




