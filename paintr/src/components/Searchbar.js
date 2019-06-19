import React from "react";
import { connect } from 'react-redux';

const Searchbar = props => {
  return (
    <div className="ui container">
      <div className="ui very large fluid input">
        <input
          type="text"
          placeholder="Search"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
      <div className="ui clearing section divider" />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    value: state.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //map a prop: that dispatches an action (within f)
    onChange: (value) => {dispatch({type: "SEARCHING", payload: value})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
