import React, {useRef, useState} from "react";
import { StyleSheet, View, Text} from "react-native";
import Toast from "react-native-easy-toast";
import { Input, Icon, Button, ListItem} from "react-native-elements"
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";

import firebase from "../../utils/firebase";
import "firebase/auth";
import MostrarGraficos from "./MostrarGraficos";
import Modal from "../Modal";

const resultados=[];
export default function BusquedaGraficos(props,params,route,navigation){
    const {user, idUsuario }=params;
//    const {user, idUsuario }= route.params;
//    const navigation= useNavigation();
//    const user = navigation.setParams.user;
//    const {user,idUsuario} = props;
    const [resultados2, setResultados2] = useState(resultados);
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const database = async() =>{
        const A = await firebase.firestore().collection("register").doc(user).collection("/suma").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                resultados.push(doc.data().count)
                console.log("Array sin invertir",resultados)
            });
        });
        console.log("Array  base datos",resultados)
//        console.log(props)
        console.log("User",user)
        console.log("idUsuario",idUsuario)
    }

    const selectedComponent = (key) =>{
        switch (key){
            case "suma":
                setRenderComponent(<MostrarGraficos setShowModal={setShowModal} resultados={resultados}/>)
                setShowModal(true);
            break;
        }
    }
    const menuOptions = generateOptions(selectedComponent);

    return(
        <View>
            <Text>Pagina de graficos! Seguimiento de tercero</Text>
            <Text>{resultados2} </Text>
            {map (menuOptions, (menu, index) =>(
                <ListItem key={index} >
                    <Icon name={menu.iconNameLeft} color={menu.iconColorLeft}/>
                        <ListItem.Content  >
                            <ListItem.Title onPress={menu.onPress}>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                    <Icon name={menu.iconNameRight} color={menu.iconColorRight}/>    
                </ListItem>
            ))} 
            {renderComponent &&(
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
            )}
            <Button title="verificar base datos" containerStyle={styles.btnContainerRegister} buttonStyle={styles.btnRegister} onPress={database}/>
        </View>
    )
}


function generateOptions(selectedComponent){
    return[
        {
            title: "Suma",
            iconType: "material-community",
            iconNameLeft: "format-list-numbered",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("suma")
        },
    ]
}

const styles= StyleSheet.create({
    btnContainerRegister:{
        marginTop:20,
        width: "95%"
    },
    btnRegister:{
        backgroundColor: "#6c00ff",
    }
})