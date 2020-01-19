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
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    textAlign: 'center',
    background: '#3f51b5',
    color: '#fff'
  },
  card: {
    minWidth: 275,
  },
  cardAddNew: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface Users {
  [name: string]: string;
}



const App: React.FC = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  let [users, setUsers] = React.useState<Users[]>([]);
  const [newUser, setNewUser] = React.useState('');
  let [randomUser, setRandomUser] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [error, setError] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [remove, setRemove] = React.useState('');
  const handleOpen = () => {
   
    let pickList: any = [];
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
    localStorage.setItem('lastPick', JSON.stringify(r));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const post = () => {
    setNewUser('')
    console.log('POST');
    let index: any = null;
    if((newUser != null) && (newUser != '')){
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList  ||'[]');
    console.log(json.length);
    if(json.length != 0){
    for (var i = 0; i < json.length; i++) {
      if (json[i].name === newUser) {
        index = i;
      }
    }
    console.log(index);
    if(index == null){
    json.push({ 'name': newUser });
    localStorage.setItem('users', JSON.stringify(json));
    setNewUser('');
    }
    else{
      setError(true);
      setHelperText('Username already exists')
    }
    }
    else{
      json.push({ 'name': newUser });
      localStorage.setItem('users', JSON.stringify(json));
      setNewUser('');
    }
    }
    else{
      setError(true);
      setHelperText('Username Needed')
    }

  }
  const removeUser = (name:any) => {
    let index: any = '';
    let currentList: any = localStorage.getItem('users');
    let json = JSON.parse(currentList ||'[]');
    for (var i = 0; i < json.length; i++) {
      if (json[i].name === name) {
        index = i;
      }
    }
    json.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(json));
    setNewUser('');
    setRemove(name);
    
    console.log(json);
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
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Random User Picker
    </Typography>
          <Button variant="contained" onClick={handleOpen} disabled={isButtonDisabled} color="secondary">Random Pick</Button>
        </Toolbar>
      </AppBar>
      <Box component="span" m={1}>

        <Container maxWidth="sm">
          <form className={classes.root} noValidate autoComplete="off">
            <Card className={classes.cardAddNew}>
              <CardHeader className={classes.header} title="Random User Picker" />
              <CardContent>
                <div>
                  <TextField error={error}  helperText={helperText} fullWidth label="User" id="newUser" name="newUser" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
                </div>
              </CardContent>
              <CardActions>
                <Button variant="contained" className={classes.addUserBtn} color="primary" onClick={() => post()}>Add User</Button>
              </CardActions>
            </Card>
          </form>
          <Grid item xs={12} md={12}>

            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  Users
          </Typography>
                <div className={classes.demo}>
                  <List dense={dense}>
                    {users.map(user => (
                      <ListItem key={user.name}>
                        <ListItemAvatar>
                          <Avatar>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={() => removeUser(user.name)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Selected User</h2>
                <p id="transition-modal-description">{randomUser}</p>
              </div>
            </Fade>
          </Modal>
        </Container>

      </Box>

    </div>
  );
}

export default App;
