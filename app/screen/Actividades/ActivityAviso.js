import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import { StyleSheet, View, Text} from "react-native"

export default function ActivityAviso(props){
    const {setShowModal} = props;
    return(
        <View>
            <Text>Se esta trabajando en la categoria a futuro</Text>
        </View>
    )
}