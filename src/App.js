import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Inbox,
  Login,
  Message,
  NotFound,
  Register,
  Send,
  Settings,
} from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/send/:receiver' element={<Send />} exact />
        <Route path='/user/home' element={<Home />} exact />
        <Route path='/user/inbox' element={<Inbox />} />
        <Route path='/user/inbox/:messageID' element={<Message />} />
        <Route path='/user/settings' element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
