import React, {useState} from 'react';
import './Register.scss';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import { FormControl, Input, Button, useToast, Box } from '@chakra-ui/react';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
  
    const handleChangeText = (e) => {
      if (e.target.id === 'email') {
        setEmail(e.target.value);
      } else if (e.target.id === 'password') {
        setPassword(e.target.value);
      }
    };
  
    const handleRegisterSubmit = async () => {
      console.log('data before send: ', email, password);
      const res = await props.registerAPI({ email, password }).catch((err) => err);
      if (res) {
        setEmail('');
        setPassword('');
        toast({
          title: "Akun sudah dibuat",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000
        });
        navigate('/login');
      }
    };

    const toLogin = () => {
        navigate('/login');
    };
  
    return (
      <Box w="100%" h="100vh">
        <div className="auth-container">
          <div className='auth-card'>
            <p className="auth-title">IPBLog Register Page</p>
            <form onSubmit={handleRegisterSubmit}>
                <FormControl>
                  <Input className="input" id="email" placeholder="user@email.com" type="email"
                    onChange={handleChangeText} value={email} />
                  <Input className="input" id="password" placeholder="password" type="password"
                    onChange={handleChangeText} value={password} />
                </FormControl>
              </form>
            <div className='reg-btn' onClick={toLogin}>Sudah Punya Akun</div>
            <Button onClick={handleRegisterSubmit} type="submit" variant="solid" colorScheme="blue" 
              mt="4" size="lg" w="full" loadingText="Menunggu database..." >Register</Button>
          </div>
        </div>
      </Box>
    );
  };

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);