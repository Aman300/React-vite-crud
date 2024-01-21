import React from 'react'
import { useState } from 'react';

export default function Form() {
  const [data, setData] = useState({
    firstName:'',
    lastName:''
  });

  const InputEvent = (event)=>{
    const {name, value} = event.target;
    setData((preVal)=>{
      return {
        ...preVal,
        [name]: value,
      }
    })
  }

  console.log(data)

  const SubmitEvent = ()=>{
    alert(`My name is ${data.firstName} ${data.lastName}`);
  }

  return (
    <>
    <form onSubmit={SubmitEvent} className='mt-20'>
      <input type="text"  onChange={(e)=> InputEvent(e)} name='firstName' id='firstName' placeholder='first name'/>
      <input type="text" onChange={(e)=> InputEvent(e)} name="lastName" id="lastName" placeholder='last name'/>
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}
