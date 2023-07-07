import React, { useState, Dispatch } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../hooks';
import { AuthOperation, UserInputType } from '../../types';
import {
  inputUsername,
  inputEmail,
  inputPassword,
} from '../slices/userInputSlice';
import { setUser } from '../slices/userSlice';

import type { RootState } from '../store';

interface AuthProps {
  toggleAuth: Dispatch<React.SetStateAction<boolean>>;
}

const Auth = (props: AuthProps): JSX.Element => {
  const userInput = useAppSelector((state: RootState) => state.userInput);
  const dispatch = useAppDispatch();

  const [signUp, toggleSignUp] = useState(false);

  async function handleSubmit(): Promise<void> {
    const operation: AuthOperation = signUp ? 'signUp' : 'logIn';
    const body: UserInputType = {
      operation: operation,
      email: userInput.email,
      password: userInput.password,
    };

    if (signUp) body.username = userInput.username;

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parsedResponse = await response.json();
    console.log('parsed response: ', parsedResponse);
    const signedIn = !!parsedResponse.username;
    dispatch(
      setUser({
        user_id: parsedResponse.user_id,
        username: parsedResponse.username,
        signedIn,
      })
    );
    props.toggleAuth(false);
  }

  return (
    <>
      <DialogTitle>{signUp === false ? 'Sign In' : 'Sign Up'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {signUp === false ? (
            <>
              Please sign in to continue.
              <br />
              <span className="swapAuth">
                Don't have an account?
                <Button size="small" onClick={() => toggleSignUp(true)}>
                  Sign Up
                </Button>
              </span>
            </>
          ) : (
            <>
              Create your account.
              <br />
              <span className="swapAuth">
                Already registered?
                <Button size="small" onClick={() => toggleSignUp(false)}>
                  Log In
                </Button>
              </span>
            </>
          )}
        </DialogContentText>
        {signUp === true && (
          <TextField
            fullWidth
            variant="standard"
            margin="normal"
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => dispatch(inputUsername(e.target.value))}
          />
        )}
        <TextField
          fullWidth
          variant="standard"
          margin="normal"
          type="text"
          id="email"
          placeholder="Email Address"
          onChange={(e) => dispatch(inputEmail(e.target.value))}
        />
        <TextField
          fullWidth
          variant="standard"
          margin="normal"
          type="text"
          id="password"
          placeholder="Password"
          onChange={(e) => dispatch(inputPassword(e.target.value))}
        />
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default Auth;
