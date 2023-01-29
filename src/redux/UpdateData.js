
const defaultState = {
    Id:[],
}
export const UpdateData = (state=defaultState, action) =>{
    switch(action.type){
        case "id":
            return {...state, Id:action.setID}
        default:
            return state
    }
}
