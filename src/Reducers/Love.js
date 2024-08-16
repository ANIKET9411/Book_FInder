const Initial_value=[];
const fantasyReducer=(state=Initial_value,action)=>{
switch(action.type)
{
    case "update_fantasy":
        return [...state,action.payload];
        case "remove_fantasy":
        return [];
    default:
        return [...state];
}
}
export default fantasyReducer;