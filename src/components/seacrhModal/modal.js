import React from "react";
import {
  Button,
  Dialog,
  Slide,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { CloseIcon } from '@material-ui/icons/Close';
import search from "../../reducers/search";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appbar:{
        backgroundColor: '#84155f'
    }
}));

function Seacrh (props) {
    
    const Transition = React.forwardRef(function Transition(props1, ref) {
        console.log(props1, ref)
        return (<Slide direction="up" ref={ref} {...props1} />);
    });
    const classes = useStyles();
    const searchIssue = (e) => {
        console.log(props.messages)
    }
    const handleClose = () => {

    }
    return(
        <React.Fragment>
        <Dialog fullScreen open={props.isOpen} onClose={props.closeDialog} TransitionComponent={Transition}>
        <AppBar className={classes.appbar}>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="email"
            fullWidth
            onChange={searchIssue}
          />
          
        </AppBar>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          
        </DialogContent>
    </Dialog>
    </React.Fragment>
    )
}

export default Seacrh;