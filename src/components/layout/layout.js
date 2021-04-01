import React, { useEffect } from 'react';
import {
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Paper,
    Fab, 
    List,
    ListItem,
    ListItemText,
    Divider,
    Tooltip,
    InputBase} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import Search from '../seacrhModal/modal';
import View from '../viewModal/view';
import {  getAllWords, getVocabWord, createVocabWord  } from '../../api/api';
import { connect } from 'react-redux';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        fontFamily: "'Kumbh Sans', sans-serif"
    },
      list: {
        marginBottom: theme.spacing(2),
      },
      text: {
        padding: theme.spacing(2, 2, 0),
      },
      paper: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      },
      appbar:{
          backgroundColor: '#84155f'
      },
      fab:{
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: '#84155f',
        size:"small",
        '&:hover' : {
            backgroundColor: '#8a1563'
        },
        iconbutton:{
            right: theme.spacing(2)
        }
      }
  }));
const messages = [];
function Layout(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [view, setView] = React.useState(false);
    const [state, setState] = React.useState([])
    const [value, setValue] = React.useState('')
    const [createValue, setCreate] = React.useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchClick = (e) => {
      console.log(e.target.value)
    setSearch(true);
  };

  const handleSearchClose = () => {
    setSearch(false);
  };
  const handleViewClick = (e) => {
      console.log(e.target)
    setView(true);
  };

  const handleViewClose = () => {
    setView(false);
  };
useEffect(() => {
   getAllwords();
}, [value])

let getAllwords = () => {
    getAllWords().then((apiResponse) => {
        if(apiResponse.status === 200){
            let data = apiResponse.data.data
            data.forEach((element) => {
                let d = {
                    id : element._id,
                    word : element.word,
                    definition : element.definition
                }
                messages.push(d)

            })
            setState (data)
        }
    })
}
const handleCreateChange = (e) => {
    console.log(e.target.value)
    setCreate(e.target.value)
}
const handleAddClick = () => {
   console.log(createValue)
   props.onTextenter(createValue)
}
// if(props.values === 'Successfull'){
//     handleClose();
// }

if (messages){
    return (
        <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.appbar}>
        
          <Toolbar>
            <Typography variant="h6">Vocab</Typography>
            
            <Tooltip title='Search'>
            <IconButton onClick={handleSearchClick} aria-label="search" color="inherit">
                <SearchIcon />
            </IconButton>
            </Tooltip>
            <Search isOpen={search} closeDialog={handleSearchClose}></Search>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container>
        <Paper square className={classes.paper}>
            <Typography className={classes.text} 
                        variant="h5" gutterBottom>
              Words List
            </Typography>
            <Divider variant='middle' />
            <List className={classes.list}>
              {state.map((object, i) => (
                    <React.Fragment key={i}>
                  <ListItem button onClick={handleViewClick}>
                    <ListItemText primary={object.word}
                                secondary={object.definition}
                                   />
                  </ListItem>
                  <Divider variant='middle' />
                </React.Fragment>
              ))}
              <View isOpen={view} closeDialog={handleViewClose}></View>
            </List>
          </Paper>
        </Container>
        <Toolbar position="fixed">
          <Tooltip title='Add New Word'>
          <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
          </Tooltip>
        </Toolbar>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add to Dictionary</DialogTitle>
            <DialogContent>
              <DialogContentText>
                New Word
              </DialogContentText>
              <TextField 
                autoFocus
                margin="dense"
                id="name"
                label=""
                type="text"
                fullWidth
                onChange={handleCreateChange}
              />
            </DialogContent>
            <DialogActions>
              <Button  onClick={handleClose} color="dark">
                Cancel
              </Button>
              <Button color="dark" onClick={handleAddClick}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
      </React.Fragment>
    )} else {
        return null
    }
    
}


const mapDispatchToProps =(dispatch) => {
    return {
        onTextenter : (value) => {dispatch({type : 'ADD_WORD', value : value})} 
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        values : state
    }
}

/**
 * connect is a function that gathers the store, the behavior and the view 
 * It returns the component that we really want to use
 */
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
