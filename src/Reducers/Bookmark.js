const Initial_value = [];

const BookmarkReducer = (state = Initial_value, action) => {
    console.log(action.payload);
  switch (action.type) {
    case "ADD_BOOKMARK":
      return [...action.payload];
    case "REMOVE_BOOKMARK":
      return [...action.payload];
    default:
      return state;
  }
};

export default BookmarkReducer;
