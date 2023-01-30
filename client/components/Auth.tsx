import React, { useState } from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../hooks';
import { AuthProps, AuthOperation, UserInputType } from "../../types";
import { inputUsername, inputEmail, inputPassword } from '../slices/userInputSlice';

import type { RootState } from "../store";

const App: React.FC<AuthProps> = (props: AuthProps) => {
  const userInput = useAppSelector((state: RootState) => state.userInput);
  const dispatch = useAppDispatch();

  const [signUp, toggleSignUp] = useState(false);

  async function handleSubmit(): Promise<void> {
    const operation: AuthOperation = (signUp) ? 'signUp' : 'logIn';
    const body: UserInputType = {
      operation: operation,
      email: userInput.email,
      password: userInput.password
    }

    if (signUp) body.username = userInput.username;

    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    console.log('response: ', await response.json());
    props.toggleAuth(false);
  }

  return (<>
    <DialogTitle>{signUp === false ? 'Sign In' : 'Sign Up'}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {signUp === false
          ? <>
            Please sign in to continue.
            <br />
            <span className='swapAuth'>Don't have an account? 
              <Button size='small' onClick={() => toggleSignUp(true)}>
                Sign Up
              </Button>
            </span>
          </>
          : <>
            Create your account.
            <br />
            <span className='swapAuth'>Already registered? 
              <Button size='small' onClick={() => toggleSignUp(false)}>
                Log In
              </Button>
            </span>
          </>
          }
        </DialogContentText>
      {signUp === true &&
        <TextField 
          fullWidth
          variant="standard"
          margin="normal"
          type='text'
          id='username'
          placeholder='Username'
          onChange={(e) => dispatch(inputUsername(e.target.value))}
        />
      }
      <TextField
        fullWidth
        variant='standard'
        margin='normal'
        type='text' 
        id='email' 
        placeholder='Email Address'
        onChange={(e) => dispatch(inputEmail(e.target.value))}
      />
      <TextField
        fullWidth
        variant='standard'
        margin='normal'
        type='text' 
        id='password' 
        placeholder='Password'
        onChange={(e) => dispatch(inputPassword(e.target.value))}
      />
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </DialogContent>
  </>)
}

export default App;