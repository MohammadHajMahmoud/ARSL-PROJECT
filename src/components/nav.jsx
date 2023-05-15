import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './cssFile/navCss.css'
import { fontSize } from '@mui/system';
export default function BotNavigation(){
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate()
 
  return (
      <Box >
      <BottomNavigation
     sx={{

   }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction      label={<span className="bottomNavLabel">ترجمة</span>} onClick={()=>navigate("/translate")}/>
        <BottomNavigationAction  label={<span className="bottomNavLabel">رفع اشارة</span>} onClick={()=>navigate("/request-sign")}/>
        <BottomNavigationAction   label={<span className="bottomNavLabel">الاشارات المتاحة</span>} onClick={()=>navigate("/avilable-words")}  />
      </BottomNavigation>
    </Box>
    
  );
}