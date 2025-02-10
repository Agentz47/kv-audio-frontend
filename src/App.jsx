import './App.css'
import AdminPage from './pages/admin/adminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';
function App() {


  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/*" element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
