import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { openMovieModal } from "../movie-modal/movie-modal.actions";

// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  cardMedia: {
    maxHeight: 394,
    overflow: "hidden"
  },
  card: {
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "0px"
  },
  bgImage: {
    width: "100%"
  }
};

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
          <img style={styles.bgImage} src={movie.poster_path} alt={movie.title}/>
        </CardMedia>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieModal }
)(MovieCardComponent);
