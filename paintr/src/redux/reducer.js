import paintingsData from '../paintings.json';
import { combineReducers } from 'redux';

//reducer f that only manages searchText state
const searchTextReducer = (oldState = "", action) => {
  switch (action.type) {
    case "SEARCHING":
      return action.payload
    default:
      return oldState
  }
}

//reducer f that only manages paintings state
const paintingsReducer = (oldState = paintingsData.paintings, action) => {
  return oldState
}

//combineReducers takes in JS obj as parameter that maps state to reducer f obj that manages that state
const rootReducer = combineReducers({
  //state: reducer function
  searchText: searchTextReducer,
  paintings: paintingsReducer
})

export default rootReducer;


// const initialState = {
//   paintings: paintingsData.paintings,
//   searchText: ''
// }

// const rootReducer = (oldState = initialState, action) => {
//   switch (action.type) {
//     case "SEARCHING":
//       return {...oldState, searchText: action.payload}
//     default:
//       return oldState
//   }
// }