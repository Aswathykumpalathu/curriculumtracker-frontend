import React from 'react'
import Header from './Header'
import './Nav.css';
import './Emp.css';
const Main = (props) => {
  return (
    <div>
<Header/>
{props.child}
    </div>
  )
}

export default Main
