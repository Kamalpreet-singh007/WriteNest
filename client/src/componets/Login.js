import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config';

const Login = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSignup, setIsSignup] = useState(isSignupButtonPressed || false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setIsSignup(isSignupButtonPressed);
  }, [isSignupButtonPressed]);
  const sendRequest = async (type = 'login') => {
    console.log('inside send req');
    console.log(`${config.BASE_URL}/api/users/${type}`);
    const res = await axios
      .post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log('return');
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest('signup')
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte('/blogs'));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte('/blogs'));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={'column'}
          alignItems="center"
          justifyContent={'center'}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}{' '}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={'email'}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={'password'}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
