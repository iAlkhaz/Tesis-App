import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/validation";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props){
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [formData,setFormData] = useState(defaultFormValue());
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErros] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e,type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    const onSubmit = () =>{
        setErros({});
        if (!formData.email || email === formData.email){
            setErros({
                email: "No se ha podido cambiar el email"
            })
        }else if (!validateEmail(formData.email)){
            setErros({
                email: "El correo introducido no es valido"
            })
        }else if(!formData.password){
            setErros({
                password: "La constraseña no pueda estar vacia"
            })
        }else{
            setIsLoading(true);
            reauthenticate(formData.password).then(response =>{
                firebase.auth().currentUser.updateEmail(formData.email)
                .then(()=>{
                    setIsLoading(true);
                    setReloadUserInfo(true);
                    toastRef.current.show("El email ha sido actualizado");
                    setShowModal(false);
                }).catch(()=>{
                    setErros({email: "Error al actualizar el email"});
                    setIsLoading(false);
                })
            }).catch(() =>{
                setIsLoading(false);
                setErros({
                    password: "La contraseña es incorrecta"
                })
            })
        }
    }
    return(
        <View style={styles.view}>
            <Input
                placeholder="Nuevo email"
                containerStyle={styles.input}
                rightIcon={{type: "material-community", name: "email", color: "#c2c2c2"}}
                defaultValue={email || ""}
                onChange={(e) => onChange(e, "email")}    
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline": "eye-outline", color: "#c2c2c2", onPress: ()=> setShowPassword(!showPassword)}}
                onChange={(e) => onChange(e, "password")}    
                errorMessage={errors.password}
            />
            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
        />
        </View>
    )
}

function defaultFormValue(){
    return{
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: "95%"
    },
    btn:{
        backgroundColor: "#6c00ff"
    }
})