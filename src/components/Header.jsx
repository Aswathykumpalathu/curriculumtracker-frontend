import React, { useEffect, useState } from 'react'
import '../App.css';
const Header = () => {
    const [userrole, setUserRole] = useState('');
    useEffect(() => {
        const storedUserRole = sessionStorage.getItem('userrole');
        setUserRole(storedUserRole);
      }, []);
      if (userrole === 'admin') {
        return (
            <div>
              <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Curriculum Tracker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/addcurriculum">Create Curriculum</a>
                <a class="nav-link" href="/admin">View Curriculum</a>
                <a class="nav-link " href="/" style={{ color: 'white' }}>Logout</a>
                
              </div>
            </div>
          </div>
        </nav>
            </div>
          )
      } else {
        return (
            <div>
              <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Curriculum Tracker</a>
            <a class="nav-link" href="/">Logout</a>
          </div>
        </nav>
            </div>
          )
      }
  
}

export default Header