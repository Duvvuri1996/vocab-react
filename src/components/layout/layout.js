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
    Container} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {  getAllWords, getVocabWord, searchVocabWord  } from '../../api/api';
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
      },
      search: {
        backgroundColor: '#84155f'
      },
      
      multilineColor:{
        color:'secondary'
    }
 
  }));

//To allow parent component to pass references of DOM element to their children 
const Transition = React.forwardRef(function Transition(props, ref) {
  return (<Slide direction="up" ref={ref} {...props} />);
});

function Layout(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);               //To view Add Dialog Box 
    const [search, setSearch] = React.useState(false);           //Search Vocab
    const [searchResult, setSearchResult] = React.useState([])   //Vocab Search result
    const [view, setView] = React.useState(false);               //To view Vocab Dialog view
    const [state, setState] = React.useState([])                 //Words list result
    const [value, setValue] = React.useState('')
    const [createValue, setCreate] = React.useState('');         //To Add vocab to the list
    const [loading, setLoading] = React.useState(false);         //To view spinner onClick of Add button
    const [success, setSuccess] = React.useState(false);         
    const [viewVocab, setViewVocab] = React.useState([]);        //view vocab result
    const [vocabName, setVocabName] = React.useState('');

  const handleClickOpen = () => {  
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchClick = (e) => {
    setSearch(true);
  };

  const handleSearchClose = () => {
    setSearch(false);
  };
  const handleViewClick = (object, e) => {
      setView(true);
      getVocab(object.word);
  };

  const handleViewClose = () => {
    setView(false);
    
  };
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

//To get list of words after component render
useEffect(() => { 
   getAllwords();
}, [value])


const getVocab = (word) => {
  getVocabWord(word).then((apiResponse) => {
    if(apiResponse.data.status === 200){
        let data = apiResponse.data.data
        if(data){
          data.forEach((element) => {
            var res = JSON.parse(element.definition)
            setViewVocab([...res])
            setVocabName(word)
          })
        }
    }
})
}

//Start Get All vocabs function
let getAllwords = () => {
    getAllWords().then((apiResponse) => {
        if(apiResponse.status === 200){
            let data = apiResponse.data.data
            var messages = [];
            var word;
            if(data){
              data.forEach(element => {
                if(element.word){
                  var word = element.word[0].toUpperCase()+element.word.slice(1)
                }
                
                var res = JSON.parse(element.definition)
                var lexical = res[0].lexicalCategory.text
                var definition=''
                res[0].entries[0].senses[0].definitions.forEach((el) => {
                  definition+=el
                })
                if(res[0].entries[0].senses[0].examples){
                var example = res[0].entries[0].senses[0].examples[0].text
                }
                let obj = {
                  word : word?word:element.word,
                  lexical : res[0].lexicalCategory.text,
                  definition : `def : ${definition}`,
                  example : example?`ex: ${example}`:''
                }
                messages.push(obj)
              });
              setState ([...messages]) //to update state
            }
        }
    })
}
//End Get All Vocabs function

//Start create vocab function
const createResult = () => {
  setOpen(false)
  setLoading(false);
  getAllWords().then((apiResponse) => {
    if(apiResponse.status === 200){
      let data = apiResponse.data.data
      var messages = [];
      var word;
      if(data){
        data.forEach(element => {
          if(element.word){
            var word = element.word[0].toUpperCase()+element.word.slice(1)
          }
          
          var res = JSON.parse(element.definition)
          var lexical = res[0].lexicalCategory.text
          var definition=''
          res[0].entries[0].senses[0].definitions.forEach((el) => {
            definition+=el
          })
          if(res[0].entries[0].senses[0].examples){
          var example = res[0].entries[0].senses[0].examples[0].text
          }
          let obj = {
            word : word?word:element.word,
            lexical : res[0].lexicalCategory.text,
            definition : `def : ${definition}`,
            example : example?`ex: ${example}`:''
          }
          messages.push(obj)
        });
        setState ([...messages]) //to update state

      }
   }
  })
  setSuccess(true);
} //end create vocab function

//Start search vocab function
const searchvocabWord = (e) => {
  searchVocabWord(e.target.value).then((apiResponse) => {
    if(apiResponse.data.status === 200){
      let data = apiResponse.data.data
      var messages=[];
      var word;
      if(data){
        data.forEach(element => {
          if(element.word){
             word = element.word[0].toUpperCase()+element.word.slice(1)
          }
          
          var res = JSON.parse(element.definition)
          var lexical = res[0].lexicalCategory.text
          var definition=''
          res[0].entries[0].senses[0].definitions.forEach((el) => {
            definition+=el
          })
          if(res[0].entries[0].senses[0].examples){
          var example = res[0].entries[0].senses[0].examples[0].text
          }
          let obj = {
            word : word?word:element.word,
            lexical : res[0].lexicalCategory.text,
            definition : `def : ${definition}`,
            example : example?`ex: ${example}`:''
          }
          messages.push(obj)
        });
        setSearchResult([...messages])
      }
    }
  })
} //end of search vocab function


    return (
    <React.Fragment>
        <CssBaseline />
        {/* View of words list */}
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography variant="h4"><strong>Dictionary</strong></Typography>
            
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
              <strong>Words List</strong>
            </Typography>
            <Divider variant='middle' />
            <List className={classes.list}>
              {state!=null?state.map((object, i) => (
                  <React.Fragment key={i}>
                    <Typography
                        variant="h2" >
                  <ListItem button  onClick={() => {handleViewClick(object)}}>
                    <ListItemText primary={<strong >{object.word}</strong>}
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
              )) : <ListItemText>{"Empty List..."}</ListItemText> }
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
        {/*End words list view*/}

        {/* View of Add Word Dialog */}
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
                autoComplete='off'
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
          {/* End Add to dictionary view */}

          {/*View of Search word dialog */}
        <Dialog fullScreen open={search} onClose={handleSearchClose} TransitionComponent={Transition}>
        <AppBar className={classes.search}>
          <Toolbar>
          <IconButton edge="end" color="inherit" onClick={handleSearchClose} >
              <CloseIcon />
            </IconButton>
            <TextField
            className={classes.multilineColor}
            autoFocus
            margin="dense"
            id="name"
            autoComplete='off'
            label="Search..."
            type="email"
            fullWidth
            onChange={searchvocabWord}
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
                  <ListItem button onClick={() => {handleViewClick(object)}}>
                    <ListItemText primary={<strong>{object.word}</strong>}
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
              )) : <ListItemText>{"No Word"}</ListItemText>}
            </List>
          </Paper>
        </Container>
          </DialogContentText>
        </DialogContent>
    </Dialog>
    {/*End Search words view */}

    {/*Start View word on click of a specific word */}
    <Dialog fullScreen open={view} onClose={handleViewClose} TransitionComponent={Transition} >
    <Toolbar>
    <IconButton edge="start" color="inherit" onClick={handleViewClose} >
                    <CloseIcon />
    </IconButton>
    <DialogTitle>
            <strong>{vocabName}</strong>
    </DialogTitle>
    </Toolbar>
      <DialogContent>
      {viewVocab != null?viewVocab.map((object, i) => (
        <React.Fragment key={i}>
            <DialogContent >
            <strong>
            {" ("}
            {object.lexicalCategory.text}
            {") "}
            </strong>
            <DialogContentText>
             {object.entries.map((item, i) => (
               <React.Fragment key={i}>
                 {<strong>{"Def :"}</strong>}
                 {item.senses?item.senses[0].definitions[0]:null}
                 {"; "}
                 {item.senses?item.senses[0].shortDefinitions[0]:null}
                 <DialogContentText>
                   {<strong>{"Ex: "}</strong>}
                 {item.senses?item.senses[0].examples[0].text:null}
                 </DialogContentText>
                 <DialogContentText>
                 {item.etymologies?item.etymologies[0]:null}
                 </DialogContentText>
                 <DialogContentText>
                 {item.grammaticalFeatures? item.grammaticalFeatures[0].text:null}
                 </DialogContentText>
                 <DialogContentText>
                  {item.pronunciations?<strong>{"Pronunciation: "}</strong>: null}
                 {item.pronunciations? item.pronunciations.map((el, i) => (
                   <React.Fragment key={i}>
                     <DialogContentText>
                     { el.phoneticSpelling}
                   </DialogContentText>
                   </React.Fragment>
             )): null}
                 </DialogContentText>
                 {item.senses[0].synonyms? <strong>{"Synonyms: "}</strong>:null}
                 {item.senses[0].synonyms?item.senses[0].synonyms.map((el, i) => (
                   <React.Fragment key={i}>
                     {el.text}
                     {", "}
                   </React.Fragment>
                 )): null}
                 <DialogContentText>
                   {item.senses[0].subsenses?
                   <React.Fragment>
                     {<strong>{"Subsenses: "}</strong>}
                     <DialogContentText>
                     {item.senses[0].subsenses[0].definitions?
                    <DialogContentText>
                      {<strong color={"#0f0f10"}>{"def: "}</strong>}
                      {item.senses[0].subsenses[0].definitions[0]}
                    </DialogContentText>: null
                    }
                    </DialogContentText>
                    <DialogContentText>
                     {item.senses[0].subsenses[0].examples?
                    <DialogContentText>
                      {<strong>{"ex: "}</strong>}
                      {item.senses[0].subsenses[0].examples[0].text}
                      </DialogContentText>: null 
                    }
                   </DialogContentText>
                   <DialogContentText>
                     {item.senses[0].subsenses[0].shortDefinitions?
                     <DialogContentText>{item.senses[0].subsenses[0].shortDefinitions[0]}</DialogContentText> :0}
                   </DialogContentText>
                   </React.Fragment>                   
                     :null}
                 </DialogContentText>
               </React.Fragment>
               ))}
            </DialogContentText>
            
          </DialogContent>
          <Divider variant="middle"/>
        </React.Fragment>
      )): 0}
      </DialogContent>
      </Dialog>
      {/*End View word on click of specific word */}

      </React.Fragment>
    )
}

/** 
 * To extablish a connection between component to reducer
*/
const mapDispatchToProps =(dispatch) => {
    return {
        onTextenter : (value) => {dispatch({type :'ADD_WORD', value : value})}
    }
}

/** 
 * To get recent state to props
*/
const mapStateToProps = (state) => {
  return state
}

/**
 * connect is a function that gathers the store, the behavior and the view 
 * It returns the component that which want to use
 */
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
