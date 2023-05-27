import React, { useState } from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  useToast,
  Box,
  Flex,
  Spacer,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChangeText = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLoginSubmit = async () => {
    const res = await props.loginAPI({ email, password }).catch((err) => err);
    if (res) {
      console.log('Login Success!', res);
      localStorage.setItem('userData', JSON.stringify(res));
      setEmail('');
      setPassword('');
      setInvalid(false);
      toast({
        title: 'Anda sudah masuk!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      navigate('/home');
    } else {
      console.log('Login Failed!');
      setInvalid(true);
    }
  };

  const handleGuestLogin = () => {
    setInvalid(false);
    toast({
      title: 'Anda masuk sebagai tamu!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });
    navigate('/home');
  };

  const toRegister = () => {
    navigate('/register');
  };

  const toForgotPassword = () => {
    navigate('/forgot-password');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box w="100%" h="100vh">
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">IPBLog Login Page</p>
          <form onSubmit={handleLoginSubmit}>
            <FormControl isInvalid={isInvalid} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                className="input"
                id="email"
                placeholder="user@email.com"
                type="email"
                onChange={handleChangeText}
                value={email}
              />
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  className="input"
                  id="password"
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChangeText}
                  value={password}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={togglePasswordVisibility}
                    icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{props.error}</FormErrorMessage>
            </FormControl>
          </form>
          <Flex>
            <Flex direction="column">
              <div className="reg-btn" onClick={toRegister}>
                Daftar akun baru
              </div>
              <div className="reg-btn" onClick={handleGuestLogin}>
                Login sebagai tamu
              </div>
            </Flex>
            <Spacer />
            <div className="reg-btn" onClick={toForgotPassword}>
              Lupa password?
            </div>
          </Flex>
          <Button
            onClick={handleLoginSubmit}
            type="submit"
            isLoading={props.isLoading}
            variant="solid"
            colorScheme="blue"
            mt="4"
            size="lg"
            w="full"
            loadingText="Logging in..."
          >
            Log in
          </Button>
        </div>
      </div>
    </Box>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading,
  error: state.error,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

const Login = connect(reduxState, reduxDispatch)(LoginForm);

export default Login;
