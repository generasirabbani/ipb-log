import './App.css';
import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'

import Header from '../../../components/molecules/header';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { ChakraProvider } from '@chakra-ui/react';

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
            </Routes>
          </div>
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
