import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import FeedbackIcon from '@material-ui/icons/Feedback';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 1500,
    position: 'fixed',
    bottom : 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    backgroundColor: '#FAF0E6'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  box: {
    display: "flex"
  },
  topLeftBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
}));

function Bottom() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <BottomNavigation className={classes.bottom}>
        <Tooltip title="like">
          <BottomNavigationAction label="Recents" value="recents" icon={<ThumbUpOutlinedIcon />} />
        </Tooltip>
        <Tooltip title="Dislike">
            <BottomNavigationAction label="Favorites" value="favorites" icon={<ThumbDownOutlinedIcon />} />
        </Tooltip>
        <Tooltip title="feedback">
            <BottomNavigationAction label="Nearby" value="nearby" icon={<FeedbackIcon />} />
        </Tooltip>
        <Tooltip title="Information">
            <BottomNavigationAction label="Folder" value="folder" icon={<InfoIcon />} />
        </Tooltip>
    </BottomNavigation>
    </div>
  );
}

export default Bottom;