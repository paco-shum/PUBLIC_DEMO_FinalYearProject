import { Link , useStaticQuery , graphql} from "gatsby"
import React from "react"
import { fade, makeStyles , useTheme, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DehazeIcon from '@material-ui/icons/Dehaze';
import HomeIcon from '@material-ui/icons/Home';
import Popover from '@material-ui/core/Popover';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  linkStyle: {
    color: "inherit",
    textDecoration: `none`,
  }
}));


function MainNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //search
  const [searchPop, setSearchPop] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);
  const handleSearchChange = event => {
    //console.log({value: event.target.value});
    setSearchPop(event.currentTarget);
    //console.log(pageQuery.allMarkdownRemark.edges);
    var tempSearchResults = []
    var searchTerms = new RegExp(event.target.value.toLowerCase());
    for(var i = 0; i < pageQuery.allStrapiArticles.edges.length; i++)
    {
      if ((searchTerms.test(pageQuery.allStrapiArticles.edges[i].node.Title.toLowerCase())) || 
      (searchTerms.test(pageQuery.allStrapiArticles.edges[i].node.categories[0].Name.toLowerCase())) || 
      (searchTerms.test(pageQuery.allStrapiArticles.edges[i].node.Content.toLowerCase())))
      {
        tempSearchResults.push(pageQuery.allStrapiArticles.edges[i]);
        //console.log(pageQuery.allMarkdownRemark.edges[i]);
      }
    }
    if (tempSearchResults.length > 0){
      setSearchResults(tempSearchResults);
      console.log(tempSearchResults);
    } else {
      setSearchResults([{
        "node": {
          "categories": [{
            "Name": "No Result",
          }],
          "Title": "No Result",
          "strapiId": "404",
          "Content": "404",
        }
      }]);
    }
    if (event.target.value === ""){
      setSearchPop(null);
      setSearchResults([]);
    }
    console.log(searchResults);
  }
  const handleClose = () => {
    setSearchPop(null);
  };
  const searchPopOpen = Boolean(searchPop);
  const id = searchPopOpen ? 'simple-popover' : undefined;
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={props.setLightDark}>
        <IconButton aria-label="light or dark mode" color="inherit">
          <Brightness4Icon />
        </IconButton>
        <p>Light/Dark</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" href={typeof window !== 'undefined' && "http://"+window.location.hostname+":1337/admin"}>
            <ExitToAppIcon />
        </IconButton>
        <p>Administration</p>
      </MenuItem>
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  const pageQuery = useStaticQuery(graphql`
    query {
      allStrapiArticles(sort: {fields: categories___Name}) {
        edges {
          node {
            categories {
              Name
            }
            Title
            strapiId
            Content
          }
        }
      }
    }    
  `
  );

  const cat = [...new Set(pageQuery.allStrapiArticles.edges.map(cat => cat.node.categories[0].Name))];

  return (
    <ThemeProvider>

    <div className={classes.grow}>
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon/> Menu
          </IconButton>


          <Typography className={classes.title} variant="h5" noWrap>
            <Link
              to="/"
              className={classes.linkStyle}
            >
            Cyber-School
            </Link>
          </Typography>


          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
              />
            <Popover disableEnforceFocus disableAutoFocus
              id={id}
              open={searchPopOpen}
              anchorEl={searchPop}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Divider />
              <List>
                {searchResults.map(({ node }) => (
                  <div key={node.strapiId}>
                    <Link
                      to={'/'+node.categories[0].Name+'/'+node.Title}
                      className={classes.linkStyle}
                    >
                      <ListItem button key={node.Title}>
                        <ListItemIcon><ArrowRightIcon/></ListItemIcon>
                        <ListItemText primary={node.Title} />
                      </ListItem> 
                    </Link>
                  </div>
                ))}
              </List>
              <Divider />
            </Popover>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="light or dark mode" color="inherit" onClick={props.setLightDark}>
                <Brightness4Icon />
            </IconButton>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <IconButton aria-label="show 17 new notifications" color="inherit" href={typeof window !== 'undefined' && "http://"+window.location.hostname+":1337/admin"}>
                <ExitToAppIcon />
            </IconButton>

            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {/* <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}

        {/* Home */}
        <List style={{padding:0}}>
          <Link
            to="/"
            className={classes.linkStyle}
          >
            <ListItem button key="Home" >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem> 
          </Link>
        </List>

        {/* Category */}
        <Divider />
        <h3 style={{
                margin: 10,
              }}>
        Categories
        </h3>
        <Divider />
        <List>
          {cat.map((text, index) => (
            <div key={index}>
            <Link
              to={"/"+text} 
              className={classes.linkStyle}
            >
              <ListItem button key={text}>
                <ListItemIcon><DehazeIcon/></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem> 
            </Link>
          </div>
          ))}
        </List>

        {/* Allpage */}
        <Divider />
        <h3 style={{
                margin: 10,
              }}>All Pages</h3>
        <Divider />
        <List>
          {pageQuery.allStrapiArticles.edges.map(({ node }) => (
            <div key={node.strapiId}>
              <Link
                to={'/'+node.categories[0].Name+'/'+node.Title}
                className={classes.linkStyle}
              >
                <ListItem button key={node.Title}>
                  {/* <ListItemIcon><ArrowRightIcon/></ListItemIcon> */}
                  <ListItemText primary={node.Title} />
                </ListItem> 
              </Link>
            </div>
           ))}
        </List>
        <Divider />
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </ThemeProvider >

  );
}
export default MainNavBar;