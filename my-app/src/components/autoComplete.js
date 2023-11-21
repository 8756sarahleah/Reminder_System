/* eslint-disable no-use-before-define */

import {useEffect,useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { getMedicinesThunk } from '../redux/thunks/medicine.thunk';

export default function ComboBox({selectedMedicine,setSelectedMedicine}) {
  

  const dispatch=useDispatch()
  const medicines=useSelector(state => state.medicines.medicines)

  useEffect(()=>{
      if(!medicines)
        dispatch(getMedicinesThunk());
  },[])

  return (
   <>
     <Autocomplete
      id="controlled-demo"
      options={medicines}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option, value) => option.id === value.id}
      value={selectedMedicine}
      onChange={(event,newValue)=>{setSelectedMedicine(newValue) }}
      sx={{ width: 350 }}
      renderInput={(params) => 
      <TextField {...params}
        name= "name"   
        label="Medicine" 
        // error={!selectedMedicine}
        // helperText={!selectedMedicine?"required":""}
        required 
      
        variant="outlined"
         />} 
        
    />
    
   </> 
  );
}


