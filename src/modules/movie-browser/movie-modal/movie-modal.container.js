import React from "react";
import { connect } from "react-redux";
import { Dialog } from "material-ui";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { closeMovieModal } from "./movie-modal.actions";
import { getMovieDetails } from "../movie-browser.actions";
import * as movieHelpers from "../movie-browser.helpers";
import Loader from "../../common/loader.component";

const styles = {
  // Can use functions to dynamically build our CSS
  dialogContent: backgroundUrl => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    height: "100%",
    minHeight: 400,
    color: "white",
    padding: 10
  })
};

class MovieModalContainer extends React.Component {
  // Triggered right after a property is changed
  componentWillReceiveProps(nextProps) {
    // If we will receive a new movieId
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
    }
  }

  handleClick(path) {
    fetch("http://172.24.16.147:3001/download" + path);
  }

  render() {
    const { isOpen, closeMovieModal, isLoading } = this.props;
    const loadingStatus = isLoading ? "loading" : "hide";
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    console.log(this.props.movie);

    // The button here will need to be updated to the new Material UI Button when
    // Material UI is updated.
    return (
      <Dialog
        autoScrollBodyContent={true}
        title={null}
        modal={false}
        open={isOpen}
        onRequestClose={closeMovieModal}
      >
        <Loader isLoading={isLoading}>
          <div style={styles.dialogContent(movie.poster_path)}>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Budget: ${movie.budget}</p>
            <button type="button" onClick={this.handleClick(movie.download_path)}>Download</button>
          </div>
        </Loader>
      </Dialog>
    );
  }
}
// "connect" our movie modal to the component store
export default connect(
  // Map nodes in our state to a properties of our component
  state => ({
    // Using lodash get, recursively check that a property is defined
    // before try to access it - if it is undefined, it will return your default value
    // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
    isOpen: _.get(state, "movieBrowser.movieModal.isOpen", false),
    movieId: _.get(state, "movieBrowser.movieModal.movieId"),
    movie: _.get(state, "movieBrowser.movieDetails.response", {}),
    isLoading: _.get(state, "movieBrowser.movieDetails.isLoading", false)
  }),
  // Map an action to a prop, ready to be dispatched
  { closeMovieModal, getMovieDetails }
)(MovieModalContainer);
