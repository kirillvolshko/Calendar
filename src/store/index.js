import {createStore, combineReducers} from 'redux';
import { ModalActive } from './ModalActive';
import { SendData } from './SendData';
import { UpdateData } from './UpdateData';
import { UpdateModalActive } from './UpdateModalActive';
const rootResucer = combineReducers({
    active: ModalActive,
    data: SendData, 
    update: UpdateData,
    activeUpdate: UpdateModalActive
})
export const store = createStore(rootResucer)