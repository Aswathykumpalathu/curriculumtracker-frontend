import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddCurriculum from './AddCurriculum';

const AdminDashboard = () => {
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
let finalJSX=  <div>
    <div className="container mt-5 pt-5">
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
