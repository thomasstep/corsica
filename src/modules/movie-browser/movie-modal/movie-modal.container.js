import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { closeMovieModal } from "./movie-modal.actions";
import { getMovieDetails } from "../movie-browser.actions";
import * as movieHelpers from "../movie-browser.helpers";
import Loader from "../../common/loader.component";
import { bindActionCreators, compose } from "redux";
import { withStyles } from "@material-ui/core/styles";

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
  }),
  button: {
    color: "#ffffff"
  },
  dialog: {
    paperWidthMd: "90%"
  }
};

class MovieModalContainer extends React.Component {
  // Triggered right after a property is changed
  componentWillReceiveProps(nextProps) {
    // If we will receive a new movieId
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.actions.getMovieDetails(nextProps.movieId);
    }
  }

  handleClick(path) {
    fetch("http://172.24.16.147:3001/download" + path);
  }

  render() {
    const { isOpen, isLoading, classes } = this.props;
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
        onBackdropClick={this.props.actions.closeMovieModal}
        onEscapeKeyDown={this.props.actions.closeMovieModal}
        style={styles.dialog}
      >
        <Loader isLoading={isLoading}>
          <div style={styles.dialogContent(movie.poster_path)}>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Budget: ${movie.budget}</p>
            <Button 
              onClick={
                () => { this.handleClick(movie.download_path) }
              }
              className={classes.button}
            >
            Download
            </Button>
          </div>
        </Loader>
      </Dialog>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // Codes come from https://wiki.viasat.com/display/CPWD/Error+Code+Dictionary#ErrorCodeDictionary-301XXISTCAlerts
  return {
    // Using lodash get, recursively check that a property is defined
    // before try to access it - if it is undefined, it will return your default value
    // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
    isOpen: _.get(state, "movieBrowser.movieModal.isOpen", false),
    movieId: _.get(state, "movieBrowser.movieModal.movieId"),
    movie: _.get(state, "movieBrowser.movieDetails.response", {}),
    isLoading: _.get(state, "movieBrowser.movieDetails.isLoading", false)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { closeMovieModal, getMovieDetails },
      dispatch
    )
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MovieModalContainer);
