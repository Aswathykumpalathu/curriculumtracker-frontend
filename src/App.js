import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import AddCurriculum from './components/AddCurriculum';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
     <Route path="/" exact element={<Login/>} />
     <Route path="/register" exact element={<Register/>} />
     <Route path="/admin" exact element={<Main child={<AdminDashboard/>}/>} />
     <Route path="/employee" exact element={<Main child={<EmployeeDashboard/>}/>} />
     <Route path="/addcurriculum" exact element= {<Main child={<AddCurriculum method="post" data = {{requirementname: "", area: "", institution: "", category: "" , hours:"",  admin_upload_url:""}} /> } />} />
    
  
    
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
