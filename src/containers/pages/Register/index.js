import React, {useState} from 'react';
import './Register.scss';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
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
      }
    };

    const toLogin = () => {
        navigate('/login');
    };
  
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">IPBLog Register Page</p>
          <input
            className="input"
            id="email"
            placeholder="Email"
            type="text"
            onChange={handleChangeText}
            value={email}
          />
          <input
            className="input"
            id="password"
            placeholder="Password"
            type="password"
            onChange={handleChangeText}
            value={password}
          />
          <div className='reg-btn' onClick={toLogin}>Sudah Punya Akun</div>
          <Button onClick={handleRegisterSubmit} title="Register" loading={props.isLoading} />
        </div>
      </div>
    );
  };

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);