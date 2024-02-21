import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import RegistrationForm from './Components/RegistrationForm'
import AgentRegistrationForm from './Components/AgentRegistrationForm'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'
import { SearchResult } from './Components/SearchResult'
import AgentDashboard from './Components/AgentDashboard'
import PropertyRegistrationForm from './Components/PropertyRegistrationForm'
import UserDashboard from './Components/UserDashboard'

function App() {
 return<>
  <BrowserRouter>
    <Routes>
      <Route path='login' element={<Login/>}></Route>
      <Route path='user-registration' element={<RegistrationForm/>}></Route>
      <Route path='agent-registration' element={<AgentRegistrationForm/>}></Route>
      <Route path='navbar' element={<Navbar/>}></Route>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='search-result' element={<SearchResult/>}></Route>
      <Route path='AgentDashboard' element={<AgentDashboard/>}></Route>
      <Route path='PropertyRegistrationForm' element={<PropertyRegistrationForm/>}></Route>
      <Route path='user-dashboard' element={<UserDashboard/>}></Route>
    </Routes>
  </BrowserRouter>
  </>
}

export default App
