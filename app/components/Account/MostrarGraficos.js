import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text} from "react-native"
import PureChart from 'react-native-pure-chart';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";



export default function MostrarGraficos(props){
    const { resultados } = props;
    return(
        <View style={styles.container}>
            <VictoryChart theme={VictoryTheme.material} domain={{y: [0,10]}}>
              <VictoryLine style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc"} }}
                data={ resultados }
              />
            </VictoryChart>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });