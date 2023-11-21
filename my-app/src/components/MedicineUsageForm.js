import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import {Grid,TextField,Button} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import ComboBox from './autoComplete';
import { addMedicineUsageThunk, updateMedicineUsageThunk } from "../redux/thunks/medicineUsage.thunk"
import HoursInput from './HoursInput';

export default function MedicineUsageForm({ onClose,action,props}) {
  useEffect(()=>{
    if(action==="Update"&&props){
      setAmount(props.amount);
      setDates([
        dayjs(props.fromDate),
        dayjs(props.toDate),
      ]);
      handleNameChange(props.medicine);
    }
  },[])
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  const [amount,setAmount]=useState('')
  const [dates, setDates] = React.useState([
    dayjs(Date.now()),
    dayjs(Date.now())
  ]);
  //const [hours,setHours]=useState(['hh','opop'])
const [selectedMedicine,setSelectedMedicine]=useState(null);

function handleNameChange(n){
  setSelectedMedicine(n)
  
}
async function  handelSubmit(event){
  event.preventDefault();
  if(action==="Add"){
    await dispatch(addMedicineUsageThunk({ amount:amount,fromDate:dates[0].toJSON(),toDate:dates[1].toJSON()  ,clientId:auth.id,medicineId:selectedMedicine.id}));
    onClose();
  }
  else{ 
    await dispatch(updateMedicineUsageThunk(props.id,{ amount:amount,fromDate:dates[0].toJSON(),toDate:dates[1].toJSON() ,clientId:auth.id,medicineId:selectedMedicine.id}))
    onClose();
  }
  
}

return (
    <>
        <Grid container  sx={{ py: 3 }} spacing={2} >
          <Grid  item xs={9} >
            <ComboBox  selectedMedicine={selectedMedicine} setSelectedMedicine={handleNameChange}/> 
          </Grid>
          <Grid  item   xs={3} >
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount"
              value={amount}
              autoComplete="given-name"
              variant="outlined"
              onChange={(e)=>setAmount(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item  >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}    >
              <DesktopDateRangePicker value={dates} onChange={(newDate)=>setDates(newDate)} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
           
        <HoursInput />
       
        <Grid container sx={{ py: 4 }} justifyContent="flex-end" >     
          <Button  variant="text"  onClick={handelSubmit}>{action}</Button>
          <Button variant="text" onClick={onClose}>Cancel</Button>
        </Grid>
      
    </>
  );
}








