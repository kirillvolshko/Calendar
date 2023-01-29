
const defaultState = {
    data: []
}
export const SendData = (state=defaultState, action) =>{
    switch(action.type){
        case "push":
            return {...state, data:[...state.data, action.payload]}
        default:
            return state
    }
}
