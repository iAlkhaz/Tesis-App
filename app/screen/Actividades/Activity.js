import React, {useState, useEffect} from "react";
import * as firebase from "firebase";
import { StyleSheet, View, Text} from "react-native"
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading"
import ActivityLogicList from "./ActivityList";
import Modal from "../../components/Modal";
import ActivityAviso from "./ActivityAviso";

export default function Activity(props){
    const navigation= useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectedComponent = (key) =>{
        switch (key){
            case "logica":
                setRenderComponent(navigation.navigate("ActivityLogicList"))
                
            break;
            case "percepcion":
                setRenderComponent(<ActivityAviso setShowModal={setShowModal}/>)
                setShowModal(true);
            break;
            case "memoria":
                setRenderComponent(<ActivityAviso setShowModal={setShowModal}/>)
                setShowModal(true);
            break;
            case "velocidad":
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
                <Text style={styles.text}>En la lista de acontinuación escoja la categoría que desea realizar</Text>
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
            title: "Logica",
            iconType: "material-community",
            iconNameLeft: "format-list-numbered",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("logica")
        },
        {
            title: "Percepcion",
            iconType: "material-community",
            iconNameLeft: "directions-walk",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("percepcion")
        },
        {
            title: "Memoria",
            iconType: "material-community",
            iconNameLeft: "memory",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("memoria")
        },
        {
            title: "Velocidad",
            iconType: "material-community",
            iconNameLeft: "alarm",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("velocidad")
        },
        {
            title: "Atencion",
            iconType: "material-community",
            iconNameLeft: "remove-red-eye",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("atencion")
        }
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