import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
//hi
//import "react-native";
//import React from "react";
//import App from "../App.js";
//import renderer from "react-test-renderer";

const data = [
  { quarter: 1, earnings: 5 },
  { quarter: 2, earnings: 10 },
  { quarter: 3, earnings: 14 },
  { quarter: 4, earnings: 1 },
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
