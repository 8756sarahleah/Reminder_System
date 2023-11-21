import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {Button,Grid,TextField} from '@mui/material';

////////
import { updateClientThunk } from "../redux/thunks/client.thunk";



export default function ProfileForm({onClose}) {

  const dispatch = useDispatch();
  // הסליס של הלקוח הנוכחי
  const user = useSelector((state) => state.auth.user);
  //סטייט לקלינט
  const [client, setClient] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone1:user.phone1,
    phone2:user.phone2,
    phone3:user.phone3,
  })

  //סטייט להודעות השגיאה
  const [errorMessages, setErrorMessages] = useState(
    {
      firstName: "",
      lastName: "",
      phone1:"",
      phone2:"",
      phone3:"",
    }
  )

  function handelClientChange(event) {
    const { name, value } = event.target;
    if (value === ""  && name !=="phone2"&&name!=="phone3")
      setErrorMessages({ ...errorMessages, [name]: "required" })
    else
        setErrorMessages({ ...errorMessages, [name]: "" })
    setClient({ ...client, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var isError = false;
    const errors = {
      firstName: "",
      lastName: "",
      phone1:"",
      phone2:"",
      phone3:"",
    }

    //בדיקות תקינות

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

    if (!isError) {
      await dispatch(updateClientThunk(user.id,{...client,password:user.password}));
      onClose();
    }
    else {
      setErrorMessages(errors);
    }
  }



  return (<>
  
                <Grid container  sx={{ py: 4 }}spacing={2} >
                    <Grid item xs={4.5} >
                        <TextField
                            onChange={handelClientChange}
                            value={client.firstName}
                            error={!!errorMessages.firstName && !client.firstName}
                            helperText={!client.firstName && errorMessages.firstName}
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={4.5}>
                        <TextField
                            onChange={handelClientChange}
                            value={client.lastName}
                            error={!!errorMessages.lastName && !client.lastName}
                            helperText={!client.lastName && errorMessages.lastName}
                            variant="outlined"
                            required
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
                    </Grid>
                </Grid>
                <Grid container  sx={{ py: 2 }} spacing={2} >                
                        <Grid item  xs={3}>
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
                        <Grid item  xs={3}>
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
                            />
                        </Grid>
                        <Grid item xs={3} >
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
                        />
                        </Grid>
                 </Grid>
                <Grid container sx={{ py: 2 }} justifyContent="flex-start">     
                    <Button  variant="text" onClick={handleSubmit}>Save Changes</Button>
                    <Button variant="text" onClick={onClose}>Cancel</Button>
               </Grid>
       
   
    </>
  );
}
