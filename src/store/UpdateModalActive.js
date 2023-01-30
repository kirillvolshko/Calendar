
const defaultState = {
    activate: false,
}
export const UpdateModalActive = (state=defaultState, action) =>{
    switch(action.type){
        case "TRUE":
            return {...state, activate: action.updateForm}
        case "FALSE":
            return {...state, activate: action.updateForm}
        default:
            return state
    }
}
