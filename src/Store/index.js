import {combineReducers, createStore} from "redux";
import fictionReducer from "../Reducers/Fiction";
import BookmarkReducer from "../Reducers/Bookmark";
import nonfictionReducer from "../Reducers/Non_fiction";
import adventureReducer from "../Reducers/Adventure";
import fantasyReducer from "../Reducers/Love";
import authenticationReducer from "../Reducers/Authentication";
 
const rootReducer=combineReducers({
    fictionReducer:fictionReducer,
    BookmarkReducer:BookmarkReducer,
    nonfictionReducer:nonfictionReducer,
    fantasyReducer:fantasyReducer,
   adventureReducer:adventureReducer,
   authenticationReducer:authenticationReducer
})
export const store=createStore(rootReducer);
