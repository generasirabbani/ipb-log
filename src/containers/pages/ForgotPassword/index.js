import React, { useState } from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { resetPasswordByEmail } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import { FormControl, Input, Button, useToast, Box, Flex, Spacer } from '@chakra-ui/react';

const LoginForm = ({ isLoading, resetPassword }) => {
  const [email, setEmail] = useState('');
  const [isInvalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChangeText = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const res = await resetPassword({ email }).catch((err) => err);
    if (res) {
      setEmail('');
      setInvalid(false);
      toast({
        title: "Tolong Cek Email untuk Reset Password",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000
      });
    } else {
      console.log('Login Failed!');
      setInvalid(true);
    }
  };

  const toRegister = () => {
    navigate('/register');
  }

  const toLogin = () => {
    navigate('/login');
  }

  return (
    <Box w="100%" h="100vh">
      <div className="auth-container">
          <div className="auth-card">
            <p className="auth-title">Forgot Password Page</p>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={isInvalid} >
                <Input className="input" id="email" placeholder="user@email.com" type="email"
                  onChange={handleChangeText} value={email} />
              </FormControl>
            </form>
            <Flex>
              <div className='reg-btn' onClick={toRegister}>Daftar akun baru</div>
              <Spacer />
              <div className='reg-btn' onClick={toLogin} >Sudah punya akun</div>
            </Flex>
            <Button onClick={handleSubmit} type="submit" isLoading={isLoading} 
              variant="solid" colorScheme="blue" mt="4" size="lg" w="full" loadingText="Logging in" >
                Kirim Email Reset Password</Button>
          </div>
      </div>
    </Box>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading
});

const reduxDispatch = (dispatch) => ({
  resetPassword: (data) => dispatch(resetPasswordByEmail(data))
});

const ForgotPassword = connect(reduxState, reduxDispatch)(LoginForm);

export default ForgotPassword;
