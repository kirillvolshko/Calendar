import React, { useState, useEffect } from 'react'
import './ModalForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { format, getUnixTime } from 'date-fns';
function ModalForm() {
    const dispatch = useDispatch();
    const activate = useSelector(state => state.active.activate)
    const [data, setData] = useState(JSON.parse(localStorage.getItem('evetsArr'))||[])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    console.log(activate)


    useEffect(()=>{
        localStorage.setItem('evetsArr', JSON.stringify(data))
      }, [data])

    const handleClick = () => {
        dispatch({type:"FALSE", switch:false})
      }

    function SendData(e) {
      e.preventDefault();
        const createEvents = {
            id:getUnixTime(new Date()),
            updateTime:undefined,
            title,
            description, 
            date,
            time,
        }
        
        setData([...data, createEvents])
        dispatch({type:"push", payload:createEvents})
        
        setTitle("")
        setDescription("")
        setDate("")
        setTime("")
        dispatch({type:"FALSE", switch:false})
    }
    

  return (
    <div className={activate ? "modal active":"modal"} >
        <div className='modal-form-content'>
        <div>
             
             <form>
                <header className='header-content'>
                  <p className='title-header'>Add new idea item</p>
                  <button onClick={()=>handleClick()} className='close-button'>X</button>
                  
                </header>
                <label className='description'>Titel*</label><br/>
                <input type="text" required placeholder='Titel goes here' className='input-titel' value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
                <label className='description'>Description*</label><br/>
                <textarea className='text-area' value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
                <label className='description' required >Date</label><br/>
                <input type='date' className='input-date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                <input type='time' className='input-time' value={time} onChange={(e)=>setTime(e.target.value)}/><br/>
                <footer className='fotter-content'>
                  <button className ='save-button active' onClick={SendData}>Save</button><br/>
                </footer>
             </form>
             
         </div>
        </div>
    </div>
  )
}

export default ModalForm