import React, { useState } from 'react';
import './Register.scss';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Input,
  Button,
  useToast,
  Box,
  HStack,
  Spacer,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { database } from '../../../config/firebase';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInvalid, setInvalid] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChangeText = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    } else if (e.target.id === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  const handleRegisterSubmit = async () => {
    if (password !== confirmPassword) {
      setInvalid(true);
      setError('Password and Confirm Password do not match.');
      return;
    }

    console.log('data before send: ', username, email, password);
    const res = await props.registerAPI({ username, email, password }).catch((err) => err);
    if (res) {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setInvalid(false);
      setError('');
      database.ref('users/' + res.uid).set(res);
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
      setError(props.error);
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box w="100%" h="100vh">
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">IPBLog Sign Up Page</p>
          <form onSubmit={handleRegisterSubmit}>
            <FormControl isInvalid={isInvalid} isRequired>
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
                    variant={showPassword ? 'solid' : 'ghost'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={togglePasswordVisibility}
                    icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    _hover={{ bg: 'none' }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  className="input"
                  id="confirmPassword"
                  placeholder="confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={handleChangeText}
                  value={confirmPassword}
                />
                <InputRightElement>
                  <IconButton
                    variant={showConfirmPassword ? 'solid' : 'ghost'}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    onClick={toggleConfirmPasswordVisibility}
                    icon={showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    _hover={{ bg: 'none' }}
                  />
                </InputRightElement>
              </InputGroup>
              {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
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
          </form>
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
