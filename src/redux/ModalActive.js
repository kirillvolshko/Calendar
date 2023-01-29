
const defaultState = {
    activate: false,
}
export const ModalActive = (state=defaultState, action) =>{
    switch(action.type){
        case "TRUE":
            return {...state, activate: action.switch}
        case "FALSE":
            return {...state, activate: action.switch}
        default:
            return state
    }
}
