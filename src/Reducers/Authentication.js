const Initial_value={};
const authenticationReducer=(state=Initial_value,action)=>{
switch(action.type)
{
    case "update_User":
        return  {...action.payload};
        case "remove_User":
        return {};
    default:
        return {...state};
}
}
export default authenticationReducer;