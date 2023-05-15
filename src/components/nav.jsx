import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import './cssFile/navCss.css'
export default function BotNavigation(){
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate()
  const useStyles = makeStyles({
    label: {
      fontSize: 40 ,
    },
  });
  const classes = useStyles();
  return (
      <Box >
      <BottomNavigation

        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction  classes={{ label: classes.label }}  label="ترجمة" onClick={()=>navigate("/translate")}/>
        <BottomNavigationAction classes={{ label: classes.label }} label="رفع إشارة" onClick={()=>navigate("/request-sign")}/>
        <BottomNavigationAction  classes={{ label: classes.label }} label="الإشارات المتاحة" onClick={()=>navigate("/avilable-words")}  />
      </BottomNavigation>
    </Box>
    
  );
}