import React, { useState } from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import { loginUserAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ isLoading, loginAPI }) => {
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

  const handleLoginSubmit = async () => {
    const res = await loginAPI({ email, password }).catch((err) => err);
    if (res) {
      console.log('Login Success!', res);
      setEmail('');
      setPassword('');
      navigate('/');
    } else {
      console.log('Login Failed!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Login Page</p>
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
        <Button onClick={handleLoginSubmit} title="Login" loading={isLoading} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
});

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Login;
