import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import './cssFile/navCss.css'
export default function BotNavigation(){
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate()
  return (
    <Box >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction  label="ترجمة" onClick={()=>navigate("/translate")}/>
        <BottomNavigationAction label="رفع إشارة" onClick={()=>navigate("/upload-video")}/>
        <BottomNavigationAction label="الإشارات المتاحة" onClick={()=>navigate("/avilable-words")}  />
      </BottomNavigation>
    </Box>
  );
}