import React, { useState, useEffect } from 'react'
import './UpdateForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { format, getUnixTime, fromUnixTime } from 'date-fns';

function UpdateForm() {
    const dispatch = useDispatch();
    const activate = useSelector(state => state.activeUpdate.activate)
    const fetchId = useSelector(state => state.update.Id)
    const [temp, setTemp] = useState("")
    const [update, setUpdate] = useState("")
    const [data, setData] = useState(JSON.parse(localStorage.getItem('evetsArr'))||[])
    const [idEvent, setIdEvent] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(()=>{
      setData(JSON.parse(localStorage.getItem('evetsArr'))||[])
      fetchId.map((eve)=>{
        /*
          fetch(url)
          .then(res=>res.json())
          .then(res=>setTemp(res))
        */
        setTemp(eve)
        setUpdate(eve.updateTime)
        setIdEvent(eve.id)
        setTitle(eve.title)
        setDescription(eve.description)
        setDate(eve.date)
        setTime(eve.time)
      })
    }, [fetchId])

    useEffect(()=>{
        localStorage.setItem('evetsArr', JSON.stringify(data))
      }, [data])

    
    //Function fetch all data, and after set them
    function SendData(e) {
      e.preventDefault();
        const createEvents = {
            id:idEvent,
            updateTime:getUnixTime(new Date()),
            title,
            description, 
            date,
            time,
        }
       
        setData(prev => prev.map(item => (item.id === idEvent ? createEvents : item)))
        dispatch({type:"push", payload:createEvents})
        /*
        fetch(url/idEvent,{
          method:PATCH,
          headers:...,
          body: JSON.stringify(data)
        })*/
        setTitle("")
        setDescription("")
        setDate("")
        setTime("")
        setTemp("")
        dispatch({type:"FALSE", switch:false})
    }
    //Function delete event
    const deleteEvent = () => {

      setData(data.filter((item)=>item.id !== idEvent))
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
                  <p className='title-header'>Update idea item</p>
                  <button onClick={()=>handleClick()} className='close-button-update'>X</button><br/>
                
                  <label className='description'>Created at:{format(fromUnixTime(idEvent), 'MM.dd.yyyy kk.mm')}</label><br/>
                  <label className={(idEvent===update)?'description active':'description'}>Update at:{format(fromUnixTime(update), 'MM.dd.yyyy kk.mm')}</label><br/>
                </header>
                <label className='description'>Title*</label><br/>
                <input type="text" required placeholder='Title goes here' className='input-titel'  value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
                <label className='description'>Description*</label><br/>
                <textarea className='text-area' value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
                <footer className='fotter-content'>
                  <button className='delete-button' onClick={deleteEvent}>Delete</button>
                  <button className ='save-button' onClick={SendData}>Save</button><br/>
                </footer>
             </form>
             
         </div>
        </div>
    </div>
  )
}

export default UpdateForm
