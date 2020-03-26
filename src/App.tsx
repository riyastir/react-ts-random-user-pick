import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import LocalMall from '@material-ui/icons/LocalMall';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#60ad5e',
      main: '#2e7d32',
      dark: '#005005',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9e40',
      main: '#ff6d00',
      dark: '#c43c00',
      contrastText: '#000000',
    },
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    textAlign: 'center',
    background: '#2e7d32',
    color: '#fff'
  },
  card: {
    minWidth: 275,
  },
  cardAddNew: {
    minWidth: 275,
    //marginBottom: theme.spacing(2),
  },
  addUserBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    flexGrow: 1,
  },
  pos: {
    marginBottom: 12,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  strike: {
    'text-decoration': 'line-through'
  },
  nonStrike: {
    'text-decoration': 'none'
  }

}));

interface Users {
  [name: string]: string;
}
interface Options {
}



const App: React.FC = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  let [users, setUsers] = React.useState<Users[]>([]);
  const [newItem, setNewItem] = React.useState('');
  const [rmName, setRmName] = React.useState('');
  const [exstItem, setExstItem] = React.useState('');
  const [newQty, setNewQty] = React.useState('');
  const [updateItem, setUpdateItem] = React.useState('');
  const [updateQty, setUpdateQty] = React.useState('');
  let [randomUser, setRandomUser] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemoveDialog, setopenRemoveDialog] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [error, setError] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [remove, setRemove] = React.useState('');
  const [checked, setChecked] = React.useState(true);
  const [checkedItem, setCheckedItem] = React.useState('');
  const [checkedQty, setCheckedQty] = React.useState('');
  const [opiton, setOption] = React.useState('');
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState();


  const handleClickOpenRemoveDialog = (name: any) => {
    setRmName(name);
    setopenRemoveDialog(true);
  };

  const handleCloseRemoveDialog = () => {
    setopenRemoveDialog(false);
  };

  const handleCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(reason);
    setOpenSnackBar(false);
  };
  const handleItemClick = (event: React.FormEvent<HTMLInputElement>, data: any) => {
    const name = event.currentTarget.value;
    console.log(name);
    let pickList: any = [];
    let newChecked: any = [];
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList || '[]');


    for (var i = 0; i < json.length; i++) {
      if (json[i].name === name) {
        index = i;
      }
    }
    const recName = json[index].name;
    const recQty = json[index].qty;
    const recChecked = json[index].checked;
    if (recChecked == true) {
      newChecked = false;
      console.log(newChecked);
    }
    else {
      newChecked = true;
      console.log(newChecked);
    }
    pickList = json.splice(index, 1);
    console.log(pickList)
    json.push({ 'name': recName, 'qty': recQty, 'checked': newChecked });
    localStorage.setItem('users', JSON.stringify(json));
    console.log(pickList);
    setCheckedItem(recName);
    setCheckedQty(recQty);
    setChecked(newChecked);
    /*console.log(name);    
    const i = optionsArr.findIndex(
      (item: any) => item.text === name     
    );
    console.log(i);
    const options = optionsArr.map((prevState: any, si: any) =>
      si === i ? {...prevState, checked: !prevState.checked} : prevState
    );
    setOptions([options]);
    console.log(options);
    console.log(optionsArr);*/
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(checked);
    console.log(event.target.value);
    /*let pickList: any = [];
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList||'[]');
    let lastPick: any = localStorage.getItem('lastPick');
    console.log(lastPick);
    let jsonLastPick = JSON.parse(lastPick||null);
    if (lastPick != null) {
      console.log(json.indexOf(jsonLastPick.name));
      for (var i = 0; i < json.length; i++) {
        if (json[i].name === jsonLastPick.name) {
          index = i;
        }
      }
      pickList = json.splice(index, 1);
    }
    else {
      pickList = currentList;
      json = JSON.parse(pickList ||'[]');
    }
    console.log(json);
    let r: any = json[Math.floor(Math.random() * json.length)];
    console.log(r.name);
    randomUser = r.name;
    setRandomUser(r.name);
    localStorage.setItem('lastPick', JSON.stringify(r));*/
  };

  const handleOpen = () => {

    /*let pickList: any = [];
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList||'[]');
    let lastPick: any = localStorage.getItem('lastPick');
    console.log(lastPick);
    let jsonLastPick = JSON.parse(lastPick||null);
    if (lastPick != null) {
      console.log(json.indexOf(jsonLastPick.name));
      for (var i = 0; i < json.length; i++) {
        if (json[i].name === jsonLastPick.name) {
          index = i;
        }
      }
      pickList = json.splice(index, 1);
    }
    else {
      pickList = currentList;
      json = JSON.parse(pickList ||'[]');
    }
    console.log(json);
    let r: any = json[Math.floor(Math.random() * json.length)];
    console.log(r.name);
    randomUser = r.name;
    setRandomUser(r.name);
    localStorage.setItem('lastPick', JSON.stringify(r));*/
    setOpen(true);
  };

  function getBoolean(value: any) {
    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
        return true;
      default:
        return false;
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const post = () => {
    setNewItem('')
    setNewQty('')
    console.log('POST');
    let index: any = null;
    if ((newItem != null) && (newItem != '')) {
      let currentList: any = localStorage.getItem('users');
      let json = JSON.parse(currentList || '[]');
      console.log(json.length);
      if (json.length != 0) {
        for (var i = 0; i < json.length; i++) {
          if (json[i].name === newItem) {
            index = i;
          }
        }
        console.log(index);
        if (index == null) {
          json.push({ 'name': newItem, 'qty': newQty, 'checked': false });
          localStorage.setItem('users', JSON.stringify(json));
          setNewItem('');
          setNewQty('');
          setAlertMessage('Item ' + newItem + ' Successfully Added !');
          setAlertType('success');
          setOpenSnackBar(true);
        }
        else {
          setError(true);
          setHelperText('Item already exists')
        }
      }
      else {
        json.push({ 'name': newItem, 'qty': newQty, 'checked': false });
        localStorage.setItem('users', JSON.stringify(json));
        setNewItem('');
        setNewQty('');
        setAlertMessage('Item ' + newItem + ' Successfully Added !');
        setAlertType('success');
        setOpenSnackBar(true);
      }
    }
    else {
      setError(true);
      setHelperText('Item Needed')
    }

  }
  const handleUpdate = () => {
    console.log(updateItem);
    console.log(exstItem);
    /** Get Existing Item name and find the index of the array */
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList || '[]');
    for (var i = 0; i < json.length; i++) {
      if (json[i].name === exstItem) {
        index = i;
      }
    }
    console.log(index);
    const recChecked = json[index].checked;
    /** Remove the array and replace with new data */
    json.splice(index, 1);
    json.push({ 'name': updateItem, 'qty': updateQty, 'checked': recChecked });
    localStorage.setItem('users', JSON.stringify(json));
    /** Set State for Updated Item, Existing Item to blank and close the modal */
    setUpdateItem('')
    setUpdateQty('')
    setExstItem('')
    setAlertMessage('Item ' + updateItem + ' Successfully Updated !');
    setAlertType('success');
    setOpenSnackBar(true);
    setOpenEdit(false)
  }
  const removeUser = (name: any) => {
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList || '[]');
    for (var i = 0; i < json.length; i++) {
      if (json[i].name === name) {
        index = i;
      }
    }
    json.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(json));
    setNewItem('');
    setNewQty('');
    setRemove(name);
    setAlertMessage('Item ' + name + ' Removed !');
    setAlertType('error');
    setOpenSnackBar(true);
    console.log(json);
    handleCloseRemoveDialog();
  }
  const handleEdit = (name: any) => {
    console.log(name);
    setOpenEdit(true);
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList || '[]');
    console.log(json);
    for (var i = 0; i < json.length; i++) {
      if (json[i].name === name) {
        index = i;
      }
    }
    const recName = json[index].name;
    const recQty = json[index].qty;
    const recChecked = json[index].checked;
    console.log(recName + ':' + recQty + ':' + recChecked);
    setUpdateItem(recName);
    setUpdateQty(recQty);
    setExstItem(recName);
  }

  users = JSON.parse(localStorage.getItem('users') || '[]');
  console.log(users.length);
  React.useEffect(() => {
    if (users.length > 1) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [users]);

  return (
    <ThemeProvider theme={theme}>
      <div >
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Shopping List
    </Typography>
            <Button variant="contained" onClick={handleOpen} color="secondary">Add</Button>
          </Toolbar>
        </AppBar>
        <Box component="span" m={1}>

          <Container maxWidth="sm">
            <Grid item xs={12} md={12}>
              {users.length == 0 ? <Card className={classes.card}>
                <CardContent>
                  <Typography variant="body2" component="p">
                    Tap Add button to create an item
        </Typography>
                </CardContent>
              </Card> : <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" className={classes.title}>
                      Items
          </Typography>
                    <div className={classes.demo}>
                      <List dense={dense}>
                        {users.map(user => (
                          <ListItem key={user.name}>
                            <ListItemAvatar>
                              <Avatar className={classes.green}>
                                <LocalMall />
                              </Avatar>
                            </ListItemAvatar>
                            <Checkbox
                              checked={getBoolean(user.checked)}
                              onChange={handleItemClick}
                              value={user.name}
                              name={user.name}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            ></Checkbox>
                            {getBoolean(user.checked) == true ? <ListItemText className={classes.strike}
                              primary={user.name}
                              secondary={user.qty ? user.qty : null}
                            /> : <ListItemText className={classes.nonStrike}
                              primary={user.name}
                              secondary={user.qty ? user.qty : null}
                              />}

                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user.name)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end" aria-label="delete" onClick={() => handleClickOpenRemoveDialog(user.name)}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </CardContent>
                </Card>}

            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter Item and Quantity Below
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="newItem"
                  name="newItem"
                  label="Item"

                  error={error}
                  helperText={helperText}
                  fullWidth
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="newQty"
                  name="newQty"
                  label="Quantity"

                  error={error}
                  helperText={helperText}
                  fullWidth
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" onClick={() => post()}>
                  Add Item
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter Item and Quantity Below
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="updateItem"
                  name="updateItem"
                  label="Item"
                  error={error}
                  helperText={helperText}
                  fullWidth
                  value={updateItem}
                  onChange={(e) => setUpdateItem(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="updateQty"
                  name="updateQty"
                  label="Quantity"
                  error={error}
                  helperText={helperText}
                  fullWidth
                  value={updateQty}
                  onChange={(e) => setUpdateQty(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cancel
          </Button>
                <Button color="primary" onClick={() => handleUpdate()}>
                  Update Item
          </Button>
              </DialogActions>
            </Dialog>

            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
              <Alert onClose={handleCloseSnackBar} severity={alertType}>
                {alertMessage}
              </Alert>
            </Snackbar>
            <Dialog
              open={openRemoveDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseRemoveDialog}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Confirm Remove Item"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                        Do you want to remove {rmName}?
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRemoveDialog} color="primary">
                  No
          </Button>
                <Button color="primary" onClick={() => removeUser(rmName)}>
                  Yes
          </Button>
              </DialogActions>
            </Dialog>
          </Container>

        </Box>

      </div>
    </ThemeProvider>
  );
}

export default App;
