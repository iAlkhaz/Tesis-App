import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Modal from "../../components/Modal";
import ActivityAviso from "./ActivityAviso";
import Suma from "../../components/ActividadSuma/Suma";
import Resta from "../../components/ActividadSuma/Resta";

export default function ActivityLogicList(){
    const navigation= useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectedComponent = (key) =>{
        switch (key){
            case "suma":
                setRenderComponent(navigation.navigate("Suma"))
                
            break;
            case "resta":
                setRenderComponent(navigation.navigate("Resta"))
                setShowModal(true);
            break;
            case "multiplicacion":
                setRenderComponent(<ActivityAviso setShowModal={setShowModal}/>)
                setShowModal(true);
            break;
            case "division":
                setRenderComponent(<ActivityAviso setShowModal={setShowModal}/>)
                setShowModal(true);
            break;
            case "atencion":
                setRenderComponent(<ActivityAviso setShowModal={setShowModal}/>)
                setShowModal(true);
            break;
            default:
                setRenderComponent(null);
                setShowModal(false);
            break;
        }
    }
    const menuOptions = generateOptions(selectedComponent);

    return(
        <View>
            <View>
                <Text style={styles.text}>Elija la actividad que desea realizar. Posteriormente aparecerán diferentes ejercicios matemáticos, donde aparecerá el ejercicio y la parte inferior a este debe ingresar su resultado</Text>
            </View>
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
        {
            title: "Resta",
            iconType: "material-community",
            iconNameLeft: "directions-walk",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("resta")
        },
        {
            title: "Mutiplicacion",
            iconType: "material-community",
            iconNameLeft: "memory",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("multiplicacion")
        },
        {
            title: "Division",
            iconType: "material-community",
            iconNameLeft: "alarm",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("division")
        },
    ]
}

const styles= StyleSheet.create({
optionsList:{
    marginLeft: 30
},
text:{
    margin:30,
    width: "90%"
}
});