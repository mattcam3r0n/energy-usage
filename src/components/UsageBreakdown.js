import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import PropTypes from "prop-types";
import numeral from "numeral";

import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  XAxis,
  YAxis,
  Hint
} from "react-vis";

class UsageBreakdown extends Component {
  state = {
    hoverValue: null,
    used: [],
    generated: [],
  };

  setHoverValue = (value) => {
    this.setState({ hoverValue: value });
  };

  clearHoverValue = () => {
    this.setState({
      hoverValue: null,
    });
  };

  render() {
    const { used } = mapData(this.props.data);
    const { width = 450, height = 150 } = this.props;
    const { hoverValue } = this.state;
    return (
      <div className="App">
        <XYPlot
          width={width}
          height={height}
          // stackBy="y"
          // yDomain={yDomain}
          xType="ordinal"
          colorType="linear"
          // colorDomain={[0, 1]}
          colorRange={["yellow", "red"]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis style={{ fontSize: 8 }} tickLabelAngle={-45} />
          <YAxis
            tickFormat={(t) => t + " kW"}
            style={{ fontSize: 8 }}
            // title="kW"
          />
          <VerticalBarSeries
            onValueMouseOver={this.setHoverValue}
            onValueMouseOut={this.clearHoverValue}
            // color="orange"
            stroke="white"
            data={used}
          />
          {hoverValue ? (
            <Hint
              value={hoverValue}
              format={(val) => [
                { title: val.name, value: numeral(val.kWh).format("0.0") + " kWh" },
              ]}
            />
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

function mapData(data) {
  const excluded = ["use", "gen", "Solar", "Solar +", "Grid"];
  if (!data || !data.usage) {
    return {
      used: [],
      generated: [],
    };
  }
  return {
    used: data.usage
      .filter((u) => !excluded.includes(u.name))
      .sort(sortKWH)
      .map((x, i) => {
        x.color = i;
        x.x = x.name;
        x.y = x.kWh;
        return x;
      }),
    generated: data.generated,
  };
}

function sortKWH(a, b) {
  if (a.kWh < b.kWh) {
    return -1;
  }
  if (a.kWh > b.kWh) {
    return 1;
  }
  return 0;
}

UsageBreakdown.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  yDomain: PropTypes.array,
};

export default UsageBreakdown;
