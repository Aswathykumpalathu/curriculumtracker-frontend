import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddCurriculum from './AddCurriculum';
import { Button,  TextField, Typography, TableHead, TableRow } from '@mui/material';
import './Nav.css';
import './Admin.css';
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
        <TextField
          name='search'
          variant='outlined'
          color="success"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label='Search'
          fullWidth
          margin='normal'
        />
        <Button onClick={searchCurriculum} variant='contained' color='primary' fullWidth>Search</Button>
    <div className="container pt-5 mb-5">
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
<th scope="col">Del</th>
<th scope="col">Update</th>
</tr>
</thead>
<tbody>

{data.map((value,index)=>{
        return<tr key={index}>
            <td>{index}</td>
      <td>{value.requirementname}</td>
      <td>{value.area}</td>
      <td>{value.institution}</td>
      <td>{value.category}</td>
      <td>{value.hours}</td>
      <td><button class="btn btn-danger" onClick={()=>deleteCurriculum(value._id)}>Delete</button></td>
      <td> <button class="btn btn-success" onClick={()=>updateCurriculum(value)}>Update</button></td>
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