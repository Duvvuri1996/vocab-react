import React from 'react';
import {
  Button,
  Dialog,
  Slide,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appbar:{
        backgroundColor: '#84155f'
    }
}));

function View (props) {
    
    const classes = useStyles();
    // const Transition = React.forwardRef(function Transition(props1, ref) {
    //     console.log(props1, ref)
    //     return (<Slide direction="up" ref={ref} {...props1} />);
    // });
    const createMarkup = 
        "{\n    \"id\": \"dermatology\",\n    \"metadata\": {\n        \"operation\": \"retrieve\",\n        \"provider\": \"Oxford University Press\",\n        \"schema\": \"RetrieveEntry\"\n    },\n    \"results\": [\n        {\n            \"id\": \"dermatology\",\n            \"language\": \"en-gb\",\n            \"lexicalEntries\": [\n                {\n                    \"derivatives\": [\n                        {\n                            \"id\": \"dermatologic\",\n                            \"text\": \"dermatologic\"\n                        },\n                        {\n                            \"id\": \"dermatological\",\n                            \"text\": \"dermatological\"\n                        },\n                        {\n                            \"id\": \"dermatologically\",\n                            \"text\": \"dermatologically\"\n                        }\n                    ],\n                    \"entries\": [\n                        {\n                            \"grammaticalFeatures\": [\n                                {\n                                    \"id\": \"mass\",\n                                    \"text\": \"Mass\",\n                                    \"type\": \"Countability\"\n                                }\n                            ],\n                            \"pronunciations\": [\n                                {\n                                    \"audioFile\": \"https://audio.oxforddictionaries.com/en/mp3/dermatology_gb_2.mp3\",\n                                    \"dialects\": [\n                                        \"British English\"\n                                    ],\n                                    \"phoneticNotation\": \"IPA\",\n                                    \"phoneticSpelling\": \"ˌdəːməˈtɒlədʒi\"\n                                }\n                            ],\n                            \"senses\": [\n                                {\n                                    \"definitions\": [\n                                        \"the branch of medicine concerned with the diagnosis and treatment of skin disorders.\"\n                                    ],\n                                    \"domainClasses\": [\n                                        {\n                                            \"id\": \"medicine\",\n                                            \"text\": \"Medicine\"\n                                        }\n                                    ],\n                                    \"id\": \"m_en_gbus0267010.005\",\n                                    \"semanticClasses\": [\n                                        {\n                                            \"id\": \"medicine\",\n                                            \"text\": \"Medicine\"\n                                        }\n                                    ],\n                                    \"shortDefinitions\": [\n                                        \"branch of medicine concerned with diagnosis and treatment of skin disorders\"\n                                    ]\n                                }\n                            ]\n                        }\n                    ],\n                    \"language\": \"en-gb\",\n                    \"lexicalCategory\": {\n                        \"id\": \"noun\",\n                        \"text\": \"Noun\"\n                    },\n                    \"text\": \"dermatology\"\n                }\n            ],\n            \"type\": \"headword\",\n            \"word\": \"dermatology\"\n        }\n    ],\n    \"word\": \"dermatology\"\n}"
    const descriptionElementRef = React.useRef(null);
     React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

 return (
     <React.Fragment>
      <Dialog open={props.isOpen} onClose={props.closeDialog}>
      <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
              {createMarkup}
          </DialogContentText>
          
        </DialogContent>
      </Dialog>
     </React.Fragment>
 )
}

export default View;