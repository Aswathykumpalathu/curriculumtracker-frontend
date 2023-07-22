import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EmployeeDashboard = () => {
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
  


  return (
    <div>
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
      
      </tr>
      })}
</tbody>
</table>
</div>
</div>
</div>

    
  )
}


export default EmployeeDashboard
