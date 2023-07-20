import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';

import { Link } from 'react-router-dom';

import Auth from './Auth';

import { useAppSelector } from '../hooks';
import { style } from '@mui/system';

const Nav = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const [showAuth, toggleAuth] = useState(false);

  // return (
  //   <>
  //     <Box sx={{ flexGrow: 1 }}>
  //       <AppBar position="static">
  //         <Toolbar>
  //           <IconButton
  //             size="large"
  //             edge="start"
  //             color="inherit"
  //             aria-label="menu"
  //             sx={{ mr: 2 }}
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //             <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
  //               Glyphtree
  //             </Link>
  //           </Typography>
  //           <Button color="inherit" onClick={() => toggleAuth(!showAuth)}>
  //             {user.signedIn ? user.username : 'Login'}
  //           </Button>
  //         </Toolbar>
  //       </AppBar>
  //       {/* Render Auth component when Sign In clicked */}
  //       {showAuth && (
  //         <Dialog
  //           open={showAuth}
  //           onClose={(event, reason) => {
  //             if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
  //               return toggleAuth(false);
  //             }
  //           }}
  //         >
  //           <Auth toggleAuth={toggleAuth} />
  //         </Dialog>
  //       )}
  //     </Box>
  //   </>
  // );

  return (
    <nav className="sticky top-0 left-0 right-0 w-full">
      <div className="flex justify-between w-full m-3">
        <div>Glyphtree</div>
        <div>
          <button
            className="px-4 bg-blue-50 underline border-2"
            onClick={() => toggleAuth(!showAuth)}
          >
            {user.signedIn ? user.username : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
