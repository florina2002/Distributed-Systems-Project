import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AdminPage from './AdminPage'; // Import the AdminPage component
import UsersPage from './UsersPage'; // Import the UsersPage component
import DevicesPage from './DevicesPage'; // Assuming you will create this as well
import ClientPage from './ClientPage'; // Import the ClientPage component


function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/devices" element={<DevicesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
