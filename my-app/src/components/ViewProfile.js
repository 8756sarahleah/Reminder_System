import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid,Card,CardActions,CardContent,Button,Typography, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Dialog from './Dialog'
import ProfileForm from './ProfileForm';

const defaultTheme = createTheme();

export default function ViewProfile() {

    const user=useSelector(state=>state.auth.user); 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        
    };
    
    const handleClose = () => {
        setOpen(false);
    };
  return (<>
    <ThemeProvider theme={defaultTheme} >
   
        <Typography align='center'  fontSize={50}>Your Profile</Typography>
 
    <Card  sx={{width:'500px'}} variant="outlined" >
      <CardContent >
        <Grid container alignContent="center" spacing={6} py={3}>
            <Grid item>
                <Typography sx={{ fontSize: 14 , mb: 1.5}} color="text.secondary" >
                First Name
                </Typography>
                <Typography variant="h5">
                {user.firstName}
                </Typography>
            </Grid>
            <Grid item>
                <Typography sx={{ fontSize: 14 , mb: 1.5 }} color="text.secondary">
                Last Name
                </Typography>
                <Typography variant="h5">
                {user.lastName}
                </Typography>
            </Grid>
         </Grid>
         <Divider/>
         <Grid sx={{ py: 3 }}>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Phone1
        </Typography>
        <Typography variant="h5">
          {user.phone1}
         </Typography>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Phone2
        </Typography>
        <Typography variant="h5">
          {user.phone2? user.phone2:"--"}
         </Typography>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Phone3
        </Typography>
        <Typography variant="h5">
           {user.phone3? user.phone3:"--"}
         </Typography>
         </Grid>
      </CardContent>
      <CardActions >
        <Grid justifyContent="flex-end" >
             <Button size="large" variant="outlined" onClick={handleOpen} >Edit Prifile</Button>
        </Grid>
       
      </CardActions>
    </Card>
    <Dialog open={open}  >
        <ProfileForm onClose={handleClose}/>
    </Dialog>
    </ThemeProvider>
    </>
  );
}
