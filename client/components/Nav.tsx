import { useState } from 'react';
import Dialog from '@mui/material/Dialog';

import { Link } from 'react-router-dom';

import Auth from './Auth';

import { useAppSelector } from '../hooks';

const Nav = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const [showAuth, toggleAuth] = useState(false);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 w-full flex justify-between px-6 py-4 bg-slate-900 text-stone-100 font-light z-50">
        <Link className="flex flex-col justify-around" to="/">
          <h1 className="text-2xl">Glyphtree</h1>
        </Link>
        <div>
          <button
            className="p-3 hover:underline"
            onClick={() => toggleAuth(!showAuth)}
          >
            {user.signedIn ? user.username : 'Login'}
          </button>
        </div>
      </nav>
      {showAuth && (
        <Dialog
          open={showAuth}
          onClose={(event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
              return toggleAuth(false);
            }
          }}
        >
          <Auth toggleAuth={toggleAuth} />
        </Dialog>
      )}
    </>
  );
};

export default Nav;
