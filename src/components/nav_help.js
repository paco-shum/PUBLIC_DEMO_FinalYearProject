import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { useStaticQuery, graphql } from "gatsby"
import Quiz from "./layout-quiz";
const shortcodes = { Quiz }


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon:{
    marginRight:3
  },
}));

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

function FloatingActionButton() {
    const data = useStaticQuery(graphql`query {
        strapiHelpContents {
          childMdx {
            body
          }
          strapiId
          updated_at
        }
      }
    `)
    const classes = useStyles();

    const [openHelp, setOpenHelp] = React.useState(false);

    const handleClickOpenHelp = () => {
        setOpenHelp(!openHelp);
    };

    console.log(data);
  return (
    <div className={classes.root}>
        <Fab variant="extended" color='primary' aria-label='nav_help' className={classes.fab} onClick={handleClickOpenHelp} >
        <HelpOutlineIcon className={classes.extendedIcon} />
            Help
        </Fab>
        <Dialog onClose={handleClickOpenHelp} aria-labelledby="customized-dialog" open={openHelp}>
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">General Help</Typography>
            </MuiDialogTitle>
            <DialogContent dividers>
                <MDXProvider components={shortcodes}><MDXRenderer>{data.strapiHelpContents.childMdx.body}</MDXRenderer></MDXProvider>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClickOpenHelp} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
export default FloatingActionButton;