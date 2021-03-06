import React from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props){
    const {
        userInfo: { uid,photoURL, displayName, email}, toastRef, setLoading, setLoadingtext,
    } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.mediaLibrary.status;

        if(resultPermissionCamera === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de galeria para cambiar")
        } else{
            const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4,3]});

        if(result.cancelled){
            toastRef.current.show("Has cerrado la seleccion de imagen")
        }else{
            uploadImage(result.uri).then(()=>{
                updatePhotoURL();
                console.log("coke", result)
            }).catch(()=>{
                toastRef.current.show("Error al subir imagen")
            
        })
        }
            }
    };

    const uploadImage = async(uri) =>{
        setLoadingtext("Actualizando avatar");
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob);
    }

    const updatePhotoURL = () =>{
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async(response) =>{
            const update = {photoURL: response};
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        }).catch(()=>{
            toastRef.current.show("Error al actualizar imagen")
        })
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
                size="large" 
                rounded 
                containerStyle={styles.userInfoAvatar}
                source={ photoURL ? {uri:photoURL} : require("../../../assets/img/avatar-default.jpg") }
                onPress={changeAvatar}
            />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : "Anonimo"}
                </Text>
                <Text>{email ? email : "Social Login"}</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginRight: 20
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5
    }
});