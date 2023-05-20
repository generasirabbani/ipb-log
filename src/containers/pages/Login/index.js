import React, { useState } from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormErrorMessage, Input, Button, useToast, Box, Flex, Spacer } from '@chakra-ui/react';

const LoginForm = ({ isLoading, loginAPI }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChangeText = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLoginSubmit = async () => {
    const res = await loginAPI({ email, password }).catch((err) => err);
    if (res) {
      console.log('Login Success!', res);
      localStorage.setItem('userData', JSON.stringify(res));
      setEmail('');
      setPassword('');
      setInvalid(false);
      toast({
        title: "Anda sudah masuk!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000
      });
      navigate('/');
    } else {
      console.log('Login Failed!');
      setInvalid(true);
    }
  };

  const toRegister = () => {
    navigate('/register');
  }

  const toForgotPassword = () => {
    navigate('/forgot-password');
  }

  return (
    <Box w="100%" h="100vh">
      <div className="auth-container">
          <div className="auth-card">
            <p className="auth-title">IPBLog Login Page</p>
            <form onSubmit={handleLoginSubmit}>
              <FormControl isInvalid={isInvalid} >
                <Input className="input" id="email" placeholder="user@email.com" type="email"
                  onChange={handleChangeText} value={email} />
                <Input className="input" id="password" placeholder="password" type="password"
                  onChange={handleChangeText} value={password} />
                <FormErrorMessage>Email atau password anda salah</FormErrorMessage>
              </FormControl>
            </form>
            <Flex>
              <div className='reg-btn' onClick={toRegister}>Daftar akun baru</div>
              <Spacer />
              <div className='reg-btn' onClick={toForgotPassword} >Lupa password?</div>
            </Flex>
            <Button onClick={handleLoginSubmit} type="submit" isLoading={isLoading} 
              variant="solid" colorScheme="blue" mt="4" size="lg" w="full" loadingText="Logging in" >
                Log in</Button>
          </div>
      </div>
    </Box>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
});

const Login = connect(reduxState, reduxDispatch)(LoginForm);

export default Login;