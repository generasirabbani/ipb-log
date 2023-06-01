import React, { useState } from 'react';
import './Register.scss';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import { FormControl, Input, Button, useToast, Box, HStack, Spacer, FormLabel, FormErrorMessage, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = (props) => {
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

  const handleRegisterSubmit = async () => {
    console.log('data before send: ', username, email, password);
    const res = await props.registerAPI({ username, email, password }).catch((err) => err);
    if (res) {
      setUsername('');
      setEmail('');
      setPassword('');
      setInvalid(false);
      toast({
        title: 'Akun sudah dibuat',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      navigate('/login');
    } else {
      setInvalid(true);
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box w="100%" h="100vh">
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">IPBLog Sign Up Page</p>
          <form onSubmit={handleRegisterSubmit}>
            <FormControl 
              isInvalid={isInvalid} 
              isRequired 
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      handleRegisterSubmit();
                  }
              }}
            >
              <FormLabel>Username</FormLabel>
              <Input
                className="input"
                id="username"
                placeholder="username"
                type="text"
                onChange={handleChangeText}
                value={username}
              />
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
                <InputRightElement>
                  <IconButton
                    variant={showPassword ? 'ghost' : 'ghost'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={togglePasswordVisibility}
                    icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    bg="none"
                    _hover={{ bg: 'none' }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{props.error}</FormErrorMessage>
            </FormControl>
          </form>
          <Button
            onClick={handleRegisterSubmit}
            type="submit"
            variant="solid"
            colorScheme="blue"
            mt="10px"
            size="lg"
            w="full"
            loadingText="Menunggu database..."
          >
            SIGN UP
          </Button>
          <HStack mt="10px">
            <Spacer />
            <div>Sudah punya akun?</div>
            <div className="reg-btn" onClick={toLogin}>
              Log In
            </div>
            <Spacer />
          </HStack>
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
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
