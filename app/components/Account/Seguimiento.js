import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../utils/firebase";
import "firebase/auth";
import Graficos from "./Graficos";
import BusquedaGraficos from "./BusquedaGraficos";
//var user = firebase.auth().currentUser;
//console.log(user.uid)
//}
//var codigoUsuario = user.uid;
//verificacionUsuario();

export default function Seguimiento (props){
    const { toastRef, setShowModal, uid} = props;
    const [idUsuario, setIdUsuario] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const navigation= useNavigation();

    const onChange = (e,type) =>{
        setIdUsuario({...idUsuario,[type]: e.nativeEvent.text});
    };

    const onSubmit = () =>{
        setError(null);
        if (!idUsuario){
            setError("Debe ingresar el codigo de seguimiento del paciente")
         } 
          else{
            console.log("OK!! Buscando, cambiando pagina!!")
         }
    };

    const progresoPersonal = () =>{
        console.log("CAmbiando pagina progreso personal")
        navigation.navigate("Graficos")
    }

    const busquedaProgreso = () =>{
        onSubmit();
        console.log(idUsuario)
        navigation.navigate("BusquedaGraficos",{idUsuario: idUsuario})
    }

    return(
        <View style={styles.view}>
            <Text style={styles.info}>Su codigo de seguimiento es</Text>
            <Text style={styles.info2}>{uid}</Text>
            <Input 
                placeholder="Ingrese codigo de seguimiento" 
                containerStyle={styles.inputForm}
                onChange={(e)=> onChange(e, "idUsuario")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="book"
                        iconStyle={styles.iconRight}
                    />}
                errorMessage={error}
            />
            <Button
                title="Revisar progreso de paciente"
                containerStyle={styles.btnContainer2}
                buttonStyle={styles.btn}
                onPress={busquedaProgreso}
                loading={isLoading}
            />
            <Button
                title="Ver el progreso personal"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={progresoPersonal}
                loading={isLoading}
            />
        </View>
    )
}

function verificacionUsuario(){
    var user = firebase.auth().currentUser;
}
const styles= StyleSheet.create({
    view:{
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 5,
        textAlign:"center",
        width: "100%"
    },
    btnContainer2:{
        marginBottom:20,
        textAlign:"center",
        width: "100%"
    },
    btn:{
        backgroundColor: "#6c00ff"
    },
    info:{
        textAlign:"center"
    },
    info2:{
        textAlign:"center",
        marginTop:5,
        fontWeight: 'bold'
    },
    inputForm:{
        width: "100%",
        marginTop: 20
    },
    iconRight:{
        color: "#c1c1c1"
    }
})