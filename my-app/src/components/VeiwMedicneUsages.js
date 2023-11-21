
import {Button,Card,CardActions,CardContent,Grid,Typography} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux"
import { getMedicinesThunk } from '../redux/thunks/medicine.thunk';
import { useEffect, useState } from 'react';
import { deleteMedicineUsageThunk } from '../redux/thunks/medicineUsage.thunk';

import MedicineUsageForm from './MedicineUsageForm'
import Dialog from './Dialog'


import * as React from 'react';



const defaultTheme = createTheme();

export default function Album() {

  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const[action,setAction]=useState("");

const[formProps,setFormProps]=useState(null);

  const handleOpen = (a) => {
    setOpen(true);
    setAction(a);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const medicineUsages=useSelector(state=>state.auth.medicineUsages)
  const medicines=useSelector(state => state.medicines.medicines)
  
  useEffect(()=>{
    if(!medicines)
       dispatch(getMedicinesThunk());
  
  },[])

  async function  handleUpdate(medicineUsageId){
      const medicineUsageToUpdate=await medicineUsages.find(m=>m.id===medicineUsageId);
      const medicine= await medicines.find(m=>m.id===medicineUsageToUpdate.medicineId)
      await setFormProps({...medicineUsageToUpdate,medicine:medicine});
      handleOpen("Update")
  }
  
  async function handleAdd(){
    await setFormProps(null);
    handleOpen("Add")
  }

  function deleteM(medicineUsageId){
    dispatch(deleteMedicineUsageThunk(medicineUsageId))
  }

 
  return (
    <>
    <ThemeProvider theme={defaultTheme} >
              <Typography align='center'  fontSize={50}>Youre Medicine Usages</Typography>
              <Grid container sx={{ py: 3 }} >
                <Grid container spacing={4}>     
                  {medicineUsages?.map((medU) => { var current = medicines?.find(m=>m.id===medU.medicineId)
                     return (
                  
                    <Grid item   key={medU.id} xs={20} sm={6} md={4}>
                      <Card
                        sx={{ height:'100%' ,display:'flex', flexDirection: 'column' }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {current?.name}
                          </Typography>
                          <Typography>
                            {"amount: "+ medU.amount}
                          </Typography>
                          {/* {medU.hours?.map((h)=>{})}
                      {console.log(medU.hours)} */}
                          <Typography>
                            {"from date: "+ medU.fromDate.slice(0,10)}
                          </Typography>
                          <Typography>
                            {"to date: "+ medU.toDate.slice(0,10)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={()=>{ handleUpdate(medU.id)}}>Edit</Button>
                          <Button onClick={()=>deleteM(medU.id)} size="small">Delete</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )})}
               
                </Grid>  
                 
               <Grid item sx={{py:3}}>  <Button  variant="outlined" size="large" onClick={()=>handleAdd()}>Add</Button>
                 </Grid>
              </Grid>
           <Dialog open={open} title={action} >
          <MedicineUsageForm onClose={handleClose} action={action} props={formProps}/>
           </Dialog>
          </ThemeProvider>
          </>
        );
  }

