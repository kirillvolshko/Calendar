
import './App.css';
import Calendar from './componets/Сalendar/Calendar';
import ModalForm from './componets/ModalForm/ModalForm';
import UpdateForm from './componets/UpdateForm/UpdateForm';
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
