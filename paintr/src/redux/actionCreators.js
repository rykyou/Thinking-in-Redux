// action creators -> functions that create and return action objs for you

function fetchedPaintings(paintings) {
  return { type: "FETCHED_PAINTINGS", paintings}
}

function loadingPaintings() {
  return { type: "LOADING_PAINTINGS" }
}

const URL = "http://localhost:3000/paintings"

function fetchingPaintings() {
  return (dispatch) => {
    //let user know app is loading
    dispatch(loadingPaintings())

    fetch(URL)
    .then(res => res.json())
    .then(paintings => {
      //update the store in Redux by dispatching action to reducer
      dispatch(fetchedPaintings(paintings))
      //let user know app is done loading 
      //within loadingReducer, change loading (state) back to false
    })
  }
}

function searching(value) {
  return { type: "SEARCHING", payload: value }
}

function updatingPaintingInfo(info) {
  //instead of returning action obj, return f to be invoked by thunk
  //this f takes in dispatch and getState & make fetch patch call
  return (dispatch, getState) => {
    fetch(`${URL}/${info.paintingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        title: info.title,
        artist: {
          name: info.name,
          birthday: info.birthday,
          deathday: info.deathday
        }
      })
    })
    .then(res => res.json())
    .then(painting => {
      dispatch(updatedPaintingInfo(painting))
    })
  }
}

function updatedPaintingInfo({id, title, artist}) {
  let {name, birthday, deathday} = artist
  let info = { paintingId: id, title, name, birthday, deathday }
  return { type: "UPDATE_PAINTING", info}
}

function votingForPainting(paintingId) {
  //instead of return JS obj, return function
  //and b/c of thunk, this f has access to dispatch & getState
  //patch request to persist vote change on backend
  return (dispatch, getState) => {
    let oldVotes = getState().paintings.find(p => p.id === paintingId).votes;

    fetch(`${URL}/${paintingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ votes: oldVotes + 1 })
    }).then(res => res.json())
      .then(painting => {
        //after fetch to backend, want to change frontend
        dispatch(votedForPainting(painting.id))
      })
  }
}

function votedForPainting(paintingId) {
  return { type: "VOTE_FOR_PAINTING", paintingId }
}

//export all of the f as named exports
export {fetchingPaintings, searching, updatingPaintingInfo, votingForPainting}