
import './App.css';
import Calendar from './componets/calendar/Calendar';
import ModalForm from './componets/ModalForm/ModalForm';
import UpdateForm from './componets/DatePicker/UpdateForm';
function App() {
  return (
    <div className="App">
      <UpdateForm/>
      <ModalForm/>
      <Calendar/>
    </div>
  );
}

export default App;
