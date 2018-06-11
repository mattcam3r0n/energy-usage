import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CurrentUsage from "./CurrentUsage";
import TwentyFourHourUsage from "./TwentyFourHourUsage";

const styles = (theme) => ({
  root: {
    marginTop: 100,
    flexGrow: 1,
  },
  twentyFourHourUsage: {
    height: 320,
    width: 820,
    padding: 20
  },
  currentUsage: {
    height: 320,
    width: 220,
    padding: 20
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class GuttersGrid extends React.Component {
  state = {
    spacing: "16",
  };

  handleChange = (key) => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            <Grid item>
              <Paper className={classes.twentyFourHourUsage}>
                <TwentyFourHourUsage />
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.currentUsage}>
                <CurrentUsage />
              </Paper>
            </Grid>
          </Grid>
          {/* 
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid> */}
        </Grid>
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);
