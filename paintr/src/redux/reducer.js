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

const loadingReducer = (oldState = false, action) => {
  switch (action.type) {
    case "FETCHED_PAINTINGS":
      return false 
      
    case "LOADING_PAINTINGS":
      return true

    default:
      return oldState
  }
}

//reducer f that only manages paintings state
const paintingsReducer = (oldState = [], action) => {
  switch (action.type) {
    case "FETCHED_PAINTINGS":
      return action.paintings 

    case "VOTE_FOR_PAINTING":
      return oldState.map(painting => {
        if (painting.id === action.paintingId) {
          return {
            ...painting, 
            votes: painting.votes + 1
          }
        }
        return painting
      })
    
    case "UPDATE_PAINTING":
      // console.log(action)
      return oldState.map(painting => {
        if (painting.id === action.info.paintingId) {
          return {
            ...painting,
            title: action.info.title,
            artist: {
              ...painting.artist,
              name: action.info.name,
              birthday: action.info.birthday,
              deathday: action.info.deathday
            }
          }
        }
        return painting
      })

    default:
      return oldState
  }
}

//combineReducers takes in JS obj as parameter that maps state to reducer f obj that manages that state
const rootReducer = combineReducers({
  //state: reducer function
  searchText: searchTextReducer,
  paintings: paintingsReducer,
  loading: loadingReducer
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