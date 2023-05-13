import './App.css';
import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'

// import Header from '../../../components/header/header';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
