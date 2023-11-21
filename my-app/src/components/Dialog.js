import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import EditNotificationsRoundedIcon from '@mui/icons-material/EditNotificationsRounded';
import NotificationAddRoundedIcon from '@mui/icons-material/NotificationAddRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }
export default function AlertDialog({ open, onClose, title, children }) {
    return (
        <Dialog 
            open={open}
            onClose={() => onClose && onClose()}
            // maxWidth={'xl'}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
           
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" >
              
    {title==="Update"?<EditNotificationsRoundedIcon /> :title==="Add"?<NotificationAddRoundedIcon/>:<PersonRoundedIcon/>} 
    </DialogTitle>
            <DialogContent   >
                {children}
            </DialogContent>
        </Dialog>
    );
}





