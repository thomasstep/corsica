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
import { HOST_IP } from "../../../common/constant.js";

const dumbStyle = {
  dialog: {
    paperWidthMd: "90%",
    textAlign: "center"
  },
  // Can use functions to dynamically build our CSS
  dialogContent: backgroundUrl => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    height: "100%",
    minHeight: 400,
    color: "white",
    padding: 10,
    textShadow: "-1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000"
  })
};

const styles = theme => ({
  button: {
    color: "#ffffff",
    "&:hover": {
      background: theme.palette.primary.light
    },
    "&:disabled": {
      color: "#ffffff"
    }
  }
});

class MovieModalContainer extends React.Component {
  // Triggered right after a property is changed
  componentWillReceiveProps(nextProps) {
    // If we will receive a new movieId
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.actions.getMovieDetails(nextProps.movieId);
    }
  }

  state = {};

  handleClick(path, id) {
    fetch("http://" + HOST_IP + ":3001/download" + path)
    .then(
      this.setState({
        [id]: {
          downloaded: true
        },
      })
    );
  }

  render() {
    const { isOpen, isLoading, classes } = this.props;
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    var isDownloaded = Object.keys(this.state).indexOf(movie.id === undefined ? -1 : movie.id.toString()) > -1;

    return (
      <Dialog
        title={null}
        open={isOpen}
        onBackdropClick={this.props.actions.closeMovieModal}
        onEscapeKeyDown={this.props.actions.closeMovieModal}
        style={dumbStyle.dialog}
        fullWidth={true}
        maxWidth={"md"}
      >
        <Loader isLoading={isLoading}>
          <div style={dumbStyle.dialogContent(movie.poster_path)}>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Cost: ${movie.price}</p>
            <Button 
              onClick={
                () => { this.handleClick(movie.download_path, movie.id) }
              }
              className={classes.button}
              disabled={isDownloaded}
            >
            {isDownloaded ? (this.state[movie.id].downloaded  ? "Downloaded" : "Purchase") : "Purchase"}
            </Button>
          </div>
        </Loader>
      </Dialog>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    // Using lodash get, recursively check that a property is defined
    // before try to access it - if it is undefined, it will return your default value
    // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
    isOpen: _.get(state, "movieBrowser.movieModal.isOpen", false),
    movieId: _.get(state, "movieBrowser.movieModal.movieId"),
    movie: _.get(state, "movieBrowser.movieDetails.response", {}),
    isLoading: _.get(state, "movieBrowser.movieDetails.isLoading", false),
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
