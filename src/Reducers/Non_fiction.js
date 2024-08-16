const Initial_value=[];
const nonfictionReducer=(state=Initial_value,action)=>{
switch(action.type)
{
    case "update_nonfiction":
        return [...state,action.payload];
        case "remove_nonfiction":
        return [];
    default:
        return [...state];
}
}
export default nonfictionReducer;