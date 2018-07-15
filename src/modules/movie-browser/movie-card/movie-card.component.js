import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { openMovieModal } from "../movie-modal/movie-modal.actions";
import { Typography } from "@material-ui/core";

// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  cardMedia: {
    maxHeight: 394,
    overflow: "hidden"
  },
  card: {
    cursor: "pointer",
    height: 400,
    overflow: "hidden"
  },
  bgImage: {
    width: "100%"
  }
};

const MOVIE_DB_BASE_URL = "http://172.24.16.147:3001";

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }

  render() {
    const { movie, openMovieModal } = this.props;
    // The CardTitle.subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? movie.overview : null;
    console.log("******* " + movie.poster_path);
    return (
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({ isMouseOver: true })}
        onMouseLeave={() => this.setState({ isMouseOver: false })}
        onClick={() => openMovieModal(movie.id)}
      >
        <CardMedia 
          style={styles.cardMedia}
          src={movie.poster_path}
        >
          <img style={styles.bgImage} src={movie.poster_path}/>
        </CardMedia>
        <CardContent>
          <Typography>
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieModal }
)(MovieCardComponent);
