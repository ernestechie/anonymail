import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Inbox,
  Landing,
  Login,
  Message,
  NotFound,
  Register,
  Settings,
} from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/send/:receiverID' element={<Landing />} exact />
        <Route path='/user' element={<Home />} />
        <Route path='/user/inbox' element={<Inbox />} />
        <Route path='/user/inbox/:messageID' element={<Message />} />
        <Route path='/user/settings' element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
