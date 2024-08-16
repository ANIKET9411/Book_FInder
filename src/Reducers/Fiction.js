const Initial_value=[];
const fictionReducer=(state=Initial_value,action)=>{
switch(action.type)
{
    case "update_fiction":
        return [...state,action.payload];
        case "remove_fiction":
        return [];
    default:
        return [...state];
}
}
export default fictionReducer;