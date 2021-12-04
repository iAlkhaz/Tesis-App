import React from "react";
import { StyleSheet, View, ScrollView, Text} from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


export default function Login(){
    return(
        <ScrollView>
            <View style={styles.viewContainer}>
                <Text>Login Form</Text>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
        </ScrollView>
    )
}

function CreateAccount(){
    const navigation= useNavigation();

    return(
        <Text style={styles.textRegister}>
            Aun no tienes cuenta?
            <Text style={styles.btnRegister} onPress={()=> navigation.navigate("Register")}>Registrarse</Text>
        </Text>
    )
}

const styles=StyleSheet.create({
    viewContainer:{
        marginRight: 40,
        marginLeft:40,
    },
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight:10,
    },
    btnRegister:{
        color: "#00a680",
        fontWeight: "bold",
    },
    divider:{
        backgroundColor: "#00a680",
        margin: 40
    }
});