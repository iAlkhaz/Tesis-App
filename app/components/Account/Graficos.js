import React, {useRef, useState} from "react";
import { StyleSheet, View, Text} from "react-native";
import Toast from "react-native-easy-toast";
import { Input, Icon, Button, ListItem} from "react-native-elements"
import { map } from "lodash";

import firebase from "../../utils/firebase";
import "firebase/auth";
import MostrarGraficos from "./MostrarGraficos";
import Modal from "../Modal";

const resultados=[];
const resultados2=[];
export default function Graficos(uidBusqueda) {
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const database = async() =>{
        const user = firebase.auth().currentUser;
        const A = await firebase.firestore().collection("register").doc(user.uid).collection("/suma").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
              //  console.log(doc.id, " => ","X", doc.data().count);
            resultados.push(doc.data().count)
        //    console.log("coke te amo",resultados)
            //console.log("coke te amo0",resultados)
            //resultados.reverse();
            console.log("Array sin invertir",resultados)
            // invertido = resultados.reverse();
            });
          });

          console.log("Array  base datos",resultados)


// Especifico
//        firebase.firestore().collection("register").doc("1cKTbw81TypfZ3P2BT59").get().then(function(doc) {
//            if (doc.exists) {
//                console.log("Document data:", doc.data());
//            } else {
        // doc.data() will be undefined in this case
//               console.log("No such document!");
//            }
//            }).catch(function(error) {
//                console.log("Error getting document:", error);
//                });
    }
        
//    const db = () =>{
//        firebase.database().ref(firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`).on("value", snapshot => {
//        console.log("register ",snapshot)     
//        })}

const database2 = async() =>{
    const user = firebase.auth().currentUser;
    const A = await firebase.firestore().collection("register").doc(user.uid).collection("/resta").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
        resultados2.push(doc.data().count)
        console.log("Array sin invertir",resultados2)
        });
      });
      console.log("Array  base datos",resultados2)
}

    const selectedComponent = (key) =>{
        switch (key){
            case "suma":
                setRenderComponent(<MostrarGraficos setShowModal={setShowModal} resultados={resultados}/>)
                setShowModal(true);
            break;
            case "resta":
                setRenderComponent(<MostrarGraficos setShowModal={setShowModal} resultados={resultados2}/>)
                setShowModal(true);
            break;
        }
    }

const menuOptions = generateOptions(selectedComponent);

    return(
        <View>
            <Text>Pagina de graficos!</Text>
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
            <Button title="verificar base datos resta" containerStyle={styles.btnContainerRegister} buttonStyle={styles.btnRegister} onPress={database2}/>
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
            {title: "Resta",
                iconType: "material-community",
                iconNameLeft: "format-list-numbered",
                iconColorLeft: "#ccc",
                iconNameRight: "chevron-right",
                iconColorRight: "#ccc",
                onPress: ()=> selectedComponent ("resta")
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