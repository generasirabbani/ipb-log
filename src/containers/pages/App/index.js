import './App.css';
import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'
import { ChakraProvider } from '@chakra-ui/react';

import Header from '../../../components/molecules/header';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider>
          <Header />
          <div>
            <Routes>
              <Route path="/" exact element={<Dashboard />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            </Routes>
          </div>
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
