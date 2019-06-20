import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import PaintingsContainer from "./PaintingsContainer";
import AboutPage from "./AboutPage";
import { fetchingPaintings } from "../redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.fetchingPaintings();
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/about" component={AboutPage} />
          <Route path="/" component={PaintingsContainer} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingPaintings: () => {dispatch(fetchingPaintings())}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
