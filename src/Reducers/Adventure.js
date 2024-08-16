const Initial_value=[];
const adventureReducer=(state=Initial_value,action)=>{
switch(action.type)
{
    case "update_adventure":
        return [...state,action.payload];
        case "remove_adventure":
        return [];
    default:
        return [...state];
}
}
export default adventureReducer;