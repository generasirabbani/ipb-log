import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../../chakra/theme';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';
import Home from '../Home';
import Detail from '../Detail';
import SubmitPostPage from '../SubmitPostPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <div>
            <Routes>
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/add-post" element={<SubmitPostPage />} />
              <Route path="/post/:userId/:postId" element={<Detail />} />
              <Route path="/post/:userId/:postId/edit" element={<SubmitPostPage />} />
            </Routes>
          </div>
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
