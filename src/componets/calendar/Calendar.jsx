import React, { useEffect, useState } from 'react'
import format from 'date-fns/format'
import './Calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import * as dateFns from 'date-fns'
function Calendar() {
  const dispatch = useDispatch();
  const fetchData = useSelector(state => state.data.data)
  const [date, SetDate] = useState(JSON.parse(localStorage.getItem('filter'))||new Date())
  const [currentDate, SetCurrentDate] = useState(JSON.parse(localStorage.getItem('filter'))||new Date())
  const [events, SetEvants] = useState(JSON.parse(localStorage.getItem('evetsArr'))||[])
  useEffect(()=>{
      localStorage.setItem('filter', JSON.stringify(date))
      SetCurrentDate(JSON.parse(localStorage.getItem('filter')))
      
  }, [date])
  console.log(currentDate)
  const totalDate = dateFns.eachDayOfInterval({ start: dateFns.startOfMonth(new Date(currentDate)), end: dateFns.endOfWeek(dateFns.lastDayOfMonth(new Date(currentDate)))})

  
  
  const handleClick = () => {
    dispatch({type:"TRUE", switch:true})
  }

  useEffect(()=>{
    const fetchEvents = ()=>{
    SetEvants(JSON.parse(localStorage.getItem('evetsArr'))||[])
    }
    fetchEvents()
  }, [fetchData])

    const sendId =(id) =>{
      dispatch({type:"id", setID:events.filter((index)=>index.id===id)})  
      dispatch({type:"TRUE", updateForm:true})
    }
   
  console.log(currentDate)
  console.log(events)
  console.log(totalDate)
  console.log(date)

  return (
    <div className='content'>
      <div className='header'>
        <div className='form-button'>
            <button onClick={()=>handleClick()}>+</button>
        </div>
        <div className='date-filter'>
            <button onClick={()=> SetCurrentDate(dateFns.subMonths(new Date(currentDate), 1))}>&#8249;</button>
            <p>{format(new Date(currentDate), 'MMM yyyy') }</p>
            <button onClick={()=> SetCurrentDate(dateFns.addMonths(new Date(currentDate), 1))}>&#8250;</button>
        </div>
        <div>
          <input type='month' className='datepicker' value={date} onChange={(e)=>SetDate(e.target.value)}/>
        </div>
      </div>
        <div className='calendar'>
            { totalDate.map((day, ind) =>(
                <div
                key={day.toString()}
                className={(dateFns.isToday(day) ? "calendar-square-this" : "calendar-square")}>
                    
                    <div className='calendar-data'>
                        <p style={{color: dateFns.isSameMonth(new Date(day), new Date(currentDate))? "" : "#ddd"}}>{format(day,'d')}</p>
                        <p style={{color: dateFns.isSameMonth(new Date(day), new Date(currentDate))? "" : "#ddd"}}>{format(day,'eee')}</p>
                    </div>
                        <div>
                        
                        {
                           events
                           .filter(eve=>eve.date===format(new Date(day), 'yyyy-MM-dd'))
                           .map((eve)=>(
                              <div className='event-title' key={eve.id} onClick={()=>sendId(eve.id)}>
                                
                                <p>{eve.title}</p>
                              </div>
                           ))
                        }
                        
                        </div>
                    
                </div>
            ))}  
        </div>
    </div>
  )
}

export default Calendar