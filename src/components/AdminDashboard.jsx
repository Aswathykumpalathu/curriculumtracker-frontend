import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddCurriculum from './AddCurriculum';
import { Button,  TextField, Typography, TableHead, TableRow } from '@mui/material';
import '../styles/Nav.css';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const [search, setSearch] = useState('');
    const [data,setData]=useState([]);
    const[update,setUpdate]=useState(false);
    const[singleValue,setSingleValue]=useState([]);
  const [userrole, setUserRole] = useState('');
  const fetchDataFromApi= ()=>{
    axios.get("http://localhost:5000/api/curriculumlist/" ).then(
    (response)=>{
        console.log(response.data)
        setData(response.data)
    }
    )
}
  useEffect(() => {
    const storedUserRole = sessionStorage.getItem('userrole');
    setUserRole(storedUserRole);
    fetchDataFromApi();
  }, []); 
  const deleteCurriculum =(id)=>{
    console.log('id delete');
    console.log(id);
    axios.delete("http://localhost:5000/api/curriculumlist/" + id)
    .then((response)=>{
        alert(response.data.message);
        window.location.reload(false);
    })
}
const ApproveCurriculum =(id)=>{
  console.log('id approve');
  console.log(id);
  axios.put("http://localhost:5000/api/curriculumlist/approve/" + id)
  .then((response)=>{
      alert(response.data.message);
      window.location.reload(false);
  })
}
const updateCurriculum =(val)=>{
    setUpdate(true);
    setSingleValue(val);


}
const searchCurriculum = () => {
  console.log('button clicked');
  // Convert the search state to an object with the field "query"
  const searchQuery = { query: search };
  axios.post("http://localhost:5000/api/curriculum/search",  { query: search })
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};
let finalJSX=  <div>
  <h1>CURRICULUM DETAILES</h1>
  <Typography>Search</Typography>
        <TextField  className='search mt-1'
          name='search'
          variant='outlined'
          color="success"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label='Search'
          fullWidth
          margin='normal'
        />
        <Button className='btnsearch m-2' onClick={searchCurriculum} variant='contained' color='primary'>Search</Button>
        <div className="container">
<div>
  
<table class="table">
<thead>
<tr>
<th scope="col">ID</th>
<th scope="col">Requirement</th>
<th scope="col">Area</th>
<th scope="col">Institution</th>
<th scope="col">Category</th>
<th scope="col">Hours</th>
<th scope="col">Download</th>
<th scope="col">Status</th>
<th scope="col"></th>
<th scope="col"></th>
<th scope="col"></th>
</tr>
</thead>
<tbody>

{data.map((value,index)=>{
        return<tr key={index}>
            <td>{index + 1}</td>
      <td>{value.requirementname}</td>
      <td>{value.area}</td>
      <td>{value.institution}</td>
      <td>{value.category}</td>
      <td>{value.hours}</td>
      <td><a href={value.faculty_upload_url}>Response Download</a></td>
      <td>{value.status}</td>
      <td>{value.status === 'InProgress' ? (
    <button class="btn btn-primary" onClick={() => ApproveCurriculum(value._id)}>
      Approve
    </button>
  ) : (
    null
  )}</td>
   <td>{value.status === 'InProgress' ? (
    <button class="btn btn-danger" onClick={()=>deleteCurriculum(value._id)}>Delete</button>
  ) : (
    null
  )}</td>
   <td>{value.status === 'InProgress' ? (
    <button class="btn btn-success" onClick={()=>updateCurriculum(value)}>Update</button>
  ) : (
    null
  )}</td>
      </tr>
      })}
</tbody>
</table>
</div>
</div>
</div>
if (update) finalJSX=<AddCurriculum method='put' data={singleValue}/>
  return (
    finalJSX

    
  )
}

export default AdminDashboard