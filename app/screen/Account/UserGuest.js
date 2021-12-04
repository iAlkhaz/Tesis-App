import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text} from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";

export default function Login(){
    const toastRef = useRef();

    return(
        <ScrollView>
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef}/>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
            <Text>Social Login</Text>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    )
}

function CreateAccount(){
    const navigation= useNavigation();

    return(
        <Text style={styles.textRegister}>
            Aun no tienes cuenta?
            <Text style={styles.btnRegister} onPress={()=> navigation.navigate("Register")}> Registrarse</Text>
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
        color: "#6c00ff",
        fontWeight: "bold",
    },
    divider:{
        backgroundColor: "#00a680",
        margin: 40
    }
});