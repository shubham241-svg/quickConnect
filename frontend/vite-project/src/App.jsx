import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/auth/signup/signupPage';
import LoginPage from './pages/auth/login/LoginPage';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';

import RightPanel from './component/common/RightPanel';
import Sidebar from './component/common/Sidebar';


function App() {

  return (
   <div className='flex max-w-6xl mx-auto'>
  {/* a common component */}
    <Sidebar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/notifications" element={<NotificationPage/>}/>
      <Route path="/profile/:username" element={<ProfilePage/>}/>
    </Routes>
    <RightPanel/>
   </div>
  )
}

export default App
