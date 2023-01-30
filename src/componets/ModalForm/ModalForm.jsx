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
    useEffect(()=>{
        localStorage.setItem('evetsArr', JSON.stringify(data))
      }, [data])
    
    //Function fetch all data, and after set them
    function SendData(e) {
      e.preventDefault();
        const createEvents = {
            id:getUnixTime(new Date()),
            updateTime:getUnixTime(new Date()),
            title,
            description, 
            date,
            time,
        }
        
        setData([...data, createEvents])
        dispatch({type:"push", payload:createEvents})
           /*
          fetch(url,{
            method:POST,
            headers:...,
            body: JSON.stringify(data)
          })
        */
        setTitle("")
        setDescription("")
        setDate("")
        setTime("")
        dispatch({type:"FALSE", switch:false})
    }
    //Function close modal form
    const handleClick = () => {
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
                <input type="text"  placeholder='Titel goes here' maxLength="30" className='input-titel' value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
                <label className='description'>Description*</label><br/>
                <textarea className='text-area' value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
                <label className='description'  >Date</label><br/>
                <input type='date' className='input-date' lang="fr-CA" value={date} onChange={(e)=>setDate(e.target.value)}/>
                <input type='time' className='input-time' lang="fr-CA" value={time} onChange={(e)=>setTime(e.target.value)}/><br/>
                <footer className='fotter-content'>
                  <button className ='save-button-modal' disabled={!title && !date} onClick={SendData}>Save</button><br/>
                </footer>
             </form>
             
         </div>
        </div>
    </div>
  )
}

export default ModalForm