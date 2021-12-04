import React from "react";
import {firebaseApp} from "./app/utils/firebase";
import { LogBox, YellowBox } from "react-native";
import Navigation from "./app/navigations/Navigations";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {

  return <Navigation/>;
}