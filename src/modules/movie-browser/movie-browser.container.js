import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Grid, Row } from "react-bootstrap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as movieActions from "./movie-browser.actions";
import * as movieHelpers from "./movie-browser.helpers";
import MovieList from "./movie-list/movie-list.component";
//import * as scrollHelpers from "../common/scroll.helpers";
import MovieModal from "./movie-modal/movie-modal.container";
import { withStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors"

const styles = theme => ({
  appBar: {
    background: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.secondary.main
  }
});

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: []
    };
    // Binds the handleScroll to this class (MovieBrowser)
    // which provides access to MovieBrowser's props
    // Note: You don't have to do this if you call a method
    // directly from a lifecycle method
    // this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.actions.getTopMovies(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // handleScroll() {
  //   const { topMovies } = this.props;
  //   if (!topMovies.isLoading) {
  //     let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
  //     if (percentageScrolled > 0.8) {
  //       const nextPage = this.state.currentPage + 1;
  //       this.props.actions.getTopMovies(nextPage);
  //       this.setState({ currentPage: nextPage });
  //     }
  //   }
  // }

  render() {
    const { topMovies } = this.props;
    const { classes } = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      // This is what gives the app its theme.palette.main.dark color
      <div style={{background: blueGrey[700]}}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.title} variant="title">
              Movie Browser
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid>
          <div style={{paddingBottom: "90px"}}></div>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading} />
          </Row>
        </Grid>
        <MovieModal />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // Codes come from https://wiki.viasat.com/display/CPWD/Error+Code+Dictionary#ErrorCodeDictionary-301XXISTCAlerts
  return {
    topMovies: state.movieBrowser.topMovies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...movieActions
      },
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
)(MovieBrowser);
