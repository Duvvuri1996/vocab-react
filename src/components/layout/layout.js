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
    Slide,
    CircularProgress,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CssBaseline,
    Container,
    ListItemSecondaryAction} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { CheckIcon, SuccessIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {  getAllWords, getVocabWord, createVocabWord  } from '../../api/api';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

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
      },
      search: {
        backgroundColor: '#84155f'
      }
  }));
const Transition = React.forwardRef(function Transition(props, ref) {
  console.log(props, ref)
  return (<Slide direction="up" ref={ref} {...props} />);
});

function Layout(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState([])
    const [view, setView] = React.useState(false);
    const [state, setState] = React.useState([])
    const [value, setValue] = React.useState('')
    const [createValue, setCreate] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  //setOpen(props.values.open)
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchClick = (e) => {
    setSearch(true);
  };

  const handleSearchClose = () => {
    setSearch(false);
  };
  const handleViewClick = (e) => {
      setView(true);
  };

  const handleViewClose = () => {
    setView(false)
  };


useEffect(() => {
   getAllwords();
}, [value])

let getAllwords = () => {
    getAllWords().then((apiResponse) => {
        if(apiResponse.status === 200){
            let data = apiResponse.data.data
            var messages = [];
            var etymology=[];
            var note = [];
            var definition = [];
            var sense = [];
            var short = [];
            if(data){
              data.forEach(element => {
                var word = element.word[0].toUpperCase()+element.word.slice(1)
                var res = JSON.parse(element.definition)
                var lexical = res[0].lexicalCategory.text
                var definition=''
                res[0].entries[0].senses[0].definitions.forEach((el) => {
                  definition+=el
                })
                var example = res[0].entries[0].senses[0].examples[0].text
                let obj = {
                  word : element.word[0].toUpperCase()+element.word.slice(1),
                  lexical : res[0].lexicalCategory.text,
                  definition : `def : ${definition}`,
                  example : `ex: ${res[0].entries[0].senses[0].examples[0].text}`
                }
                messages.push(obj)
                // res.forEach((item) => {
                //   console.log(item)
                //   if(item.etymologies){
                //     item.etymologies.forEach((el) => {
                //       etymology.push(el)
                //     })
                //     console.log(etymology)
                //     messages.push(etymology)
                //   }
                //   if(item.notes){
                //     item.notes.forEach((el) => {
                //       note.push(el.text)
                //     })
                //     console.log(note)
                //     messages.push(note)
                //   }
                //   if(item.pronunciations){
                //       let obj = {
                //         notation : item.pronunciations[0].phoneticNotation,
                //         spelling : item.pronunciations[0].phoneticSpelling
                //     }
                //     console.log(obj)
                //     messages.push(obj)
                //   }
                //   if(item.senses){
                //     item.senses[0].definitions.forEach((el) => {
                //       definition.push(el)
                //       console.log(definition)
                //     })
                //     item.senses[0].examples.forEach((el) => {
                //       let a = el.text
                //       sense.push(a)
                //       console.log(sense)
                //     })
                //     item.senses[0].shortDefinitions.forEach((el) => {
                //       let b = el
                //       short.push(b)
                //     })
                //     console.log(short)
                //     messages.push(definition)
                //     messages.push(sense)
                //     messages.push(sense)
                //   }

                // })
              });
              setState ([...messages])
            }
            
        }
    })
}
const handleCreateChange = (e) => {
    setCreate(e.target.value)
}
const handleAddClick = () => {
   props.onTextenter(createValue)
   setLoading(true)
   setTimeout(() => {
     createResult()
   }, 5000)
}

const createResult = () => {
  setOpen(false)
  setLoading(false);
  getAllWords().then((apiResponse) => {
    if(apiResponse.status === 200){
      let data = apiResponse.data.data
      var messages = [];
      if(data){
        data.forEach(element => {
          var word = element.word[0].toUpperCase()+element.word.slice(1)
          var res = JSON.parse(element.definition)
          var lexical = res[0].lexicalCategory.text
          var definition=''
          res[0].entries[0].senses[0].definitions.forEach((el) => {
            definition+=el
          })
          var example = res[0].entries[0].senses[0].examples[0].text
          let obj = {
            word : element.word[0].toUpperCase()+element.word.slice(1),
            lexical : res[0].lexicalCategory.text,
            definition : `def : ${definition}`,
            example : `ex: ${res[0].entries[0].senses[0].examples[0].text}`
          }
          messages.push(obj)
        });
        setState ([...messages])

      }
   }
  })
  setSuccess(true);
}

const searchIssue = (e) => {
  getVocabWord(e.target.value).then((apiResponse) => {
    if(apiResponse.data.status === 200){
      let data = apiResponse.data.data
      var messages=[];
      if(data){
        data.forEach(element => {
          var word = element.word[0].toUpperCase()+element.word.slice(1)
          var res = JSON.parse(element.definition)
          var lexical = res[0].lexicalCategory.text
          var definition=''
          res[0].entries[0].senses[0].definitions.forEach((el) => {
            definition+=el
          })
          var example = res[0].entries[0].senses[0].examples[0].text
          let obj = {
            word : element.word[0].toUpperCase()+element.word.slice(1),
            lexical : res[0].lexicalCategory.text,
            definition : `def : ${definition}`,
            example : `ex: ${res[0].entries[0].senses[0].examples[0].text}`
          }
          messages.push(obj)
        });
        setSearchResult([...messages])
      }
    }
  })
}
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
              {state!=null?state.map((object, i) => (
                  <React.Fragment key={i}>
                    <Typography
                        variant="h2" >
                  <ListItem button onClick={handleViewClick}>
                    <ListItemText primary={object.word}
                                secondary={
                                  <React.Fragment>
                                    <ListItemText primary={object.lexical}
                                    secondary={object.definition}/>
                                    <ListItemText primary={object.example}
                                   />   
                                  </React.Fragment>
                                }
                    />
                  </ListItem>
                  <Divider variant='middle' />
                  </Typography>
                </React.Fragment>
              )) : null }
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
            open={open }
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
              <Button  onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" onClick={handleAddClick}>
                Add
              </Button>
              {loading && <CircularProgress />}
            </DialogActions>
          </Dialog>
          <Dialog fullScreen open={search} onClose={handleSearchClose} TransitionComponent={Transition}>
        <AppBar className={classes.search}>
          <Toolbar>
          <IconButton edge="end" color="inherit" onClick={handleSearchClose} >
              <CloseIcon />
            </IconButton>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="email"
            fullWidth
            color="primary"
            onChange={searchIssue}
          />
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
          <Container>
        <Paper square className={classes.paper}>
            <Typography className={classes.text} 
                        variant="h5" gutterBottom>
              Words List
            </Typography>
            <Divider variant='middle' />
            <List className={classes.list}>
              {searchResult!=null?searchResult.map((object, i) => (
                  <React.Fragment key={i}>
                     <Typography
                        variant="h2" >
                  <ListItem button onClick={handleViewClick}>
                    <ListItemText primary={object.word}
                                secondary={
                                  <React.Fragment>
                                    <ListItemText primary={object.lexical}
                                    secondary={object.definition}/>
                                    <ListItemText primary={object.example}
                                   />   
                                  </React.Fragment>
                                }
                    />        
                  </ListItem>
                  <Divider variant='middle' />
                  </Typography>
                </React.Fragment>
              )) : null }
            </List>
          </Paper>
        </Container>
          </DialogContentText>
        </DialogContent>
    </Dialog>
    <Dialog fullScreen open={view} onClose={handleViewClose} TransitionComponent={Transition}>
      <DialogTitle id="scroll-dialog-title">{}</DialogTitle>
      <IconButton edge="start" color="inherit" onClick={handleViewClose} >
              <CloseIcon />
      </IconButton>
        <DialogContent>
          <DialogContentText
          >
          </DialogContentText>
          
        </DialogContent>
      </Dialog>
      </React.Fragment>
    )
}


const mapDispatchToProps =(dispatch) => {
    return {
        onTextenter : (value) => {dispatch({type : 'ADD_WORD', value : value})} 
    }
}
const mapStateToProps = (state) => {
    return {
        values : state
    }
}

/**
 * connect is a function that gathers the store, the behavior and the view 
 * It returns the component that we really want to use
 */
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
