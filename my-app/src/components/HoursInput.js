import React,{useState} from "react";

import { Button ,FormControl,Grid,IconButton,InputLabel,InputAdornment,OutlinedInput,TextField, Typography } from '@mui/material'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import MoreTimeIcon from '@mui/icons-material/MoreTime';

export default function HoursInput() {
  const [arrHours, setArrHours] = useState([""]);

  //הוספה
  function addHour() {
    setArrHours([...arrHours, '']);
  }

  //מחיקה
  function deleteItem(index) {
    setArrHours(arrHours.filter((item, i) => i !== index));
  }

  const handelChange= (index) => (event) => {
    const arrCopy = [...arrHours];
    arrCopy[index] = event.target.value;
    setArrHours(arrCopy);
  }

   return (
    <>
   
    <Typography><IconButton  onClick={() => addHour()} color="primary">
  <MoreTimeIcon />
</IconButton>Hours</Typography>
    <Grid container  spacing={2} >
        {arrHours.map((hour, index) => (
          //////////
          <Grid item  key={index} >
          <FormControl  variant="outlined" required  >
          
            <OutlinedInput
              onChange={handelChange(index)}
              value={hour}
              id={`hour${index}`}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=>deleteItem(index)}
                    edge="end"
                  >
                    <DeleteForeverRoundedIcon/>
                  </IconButton>
                </InputAdornment>
              }
              variant="outlined"
              required
              sx={{ m: 1, width: '15ch' }} 
              name={`hour${index}`}
            />
            {/* <FormHelperText focused id="password helper" >{errorMessages.password}</FormHelperText> */}
          </FormControl>
          </Grid>
          //////////
                  ))}
                </Grid>
    
   
      </>);
}
