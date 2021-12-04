import React, { useState } from "react";
import {StyleSheet, View} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import Seguimiento from "./Seguimiento";

export default function AccountOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectedComponent = (key) =>{
        switch (key){
            case "displayName":
                setRenderComponent(<ChangeDisplayNameForm displayName={userInfo.displayName} setShowModal={setShowModal} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>)
                setShowModal(true);
            break;
            case "email":
                setRenderComponent(<ChangeEmailForm email={userInfo.email} setShowModal={setShowModal} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>)
                setShowModal(true);
            break;
            case "password":
                setRenderComponent(<ChangePasswordForm password={userInfo.password} setShowModal={setShowModal} toastRef={toastRef}/>)
                setShowModal(true);
            break;
            case "Graphic":
                setRenderComponent(<Seguimiento uid={userInfo.uid} setShowModal={setShowModal} toastRef={toastRef}/>)
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
        <View >
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
    );
}

function generateOptions(selectedComponent){
    return[
        {
            title: "Cambiar Nombre y Apellido",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("displayName")
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "email",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("email")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("password")
        },
        {
            title: "Seguimiento",
            iconType: "material-community",
            iconNameLeft: "book",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: ()=> selectedComponent ("Graphic")
        }
    ]
}

const styles= StyleSheet.create({
    optionsList:{
        marginLeft: 30
    }
});