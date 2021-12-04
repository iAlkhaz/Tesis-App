import React, {useState} from "react";
import { StyleSheet, View, Text, RefreshControlBase} from "react-native";
import { Input, Icon, Button} from "react-native-elements"
import Loading from "../Loading"
import { validateEmail } from "../../utils/validation";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { NavigationContainer, useNavigation } from "@react-navigation/native";


export default function RegisterForm(props){
    const {toastRef} =props;
    const[showPassword, setShowPassword] = useState(false);
    const[showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () =>{
        if (
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword) 
        ) {
            toastRef.current.show("Todos los campos son obligatorios")
         } else if (!validateEmail(formData.email)){
             toastRef.current.show("Correo invalido")
         } else if(formData.password !==formData.repeatPassword){
            toastRef.current.show("La contraseña son distintas")
         } else if (size(formData.password)<6){
             toastRef.current.show("La constraseña debe ser como minimo de 6")
         }
          else{
            setLoading(true);
            firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password).then(()=>{
                setLoading(false);
                navigation.navigate("Account");
            }).catch(() =>{
                setLoading(false);
                toastRef.current.show("El email esta en uso, intente con otro email")
            })
         }
    };

    const onChange = (e,type) =>{
        setFormData({...formData,[type]: e.nativeEvent.text});
    };

    return(
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electronico" 
                containerStyle={styles.inputForm} 
                onChange={(e)=> onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="email-outline"
                        iconStyle={styles.iconRight}
                    />}
            />
            <Input 
                placeholder="Contraseña" 
                containerStyle={styles.inputForm} 
                onChange={(e)=> onChange(e, "password")}
                password={true} 
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=> setShowPassword(!showPassword)}
                    />}
            />
            <Input 
                placeholder="Repetir contraseña" 
                containerStyle={styles.inputForm} 
                onChange={(e)=> onChange(e, "repeatPassword")}
                password={true} 
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                    />}
            />
            <Button title="Registrarse" containerStyle={styles.btnContainerRegister} buttonStyle={styles.btnRegister} onPress={onSubmit}/>
            <Loading isVisible={loading} text="Creando su cuenta"/>
        </View>
    )
}

function defaultFormValue(){
    return{
        email:"",
        password:"",
        repeatPassword:"",
    }
}

const styles=StyleSheet.create({
    formContainer:{ 
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm:{
        width: "100%",
        marginTop: 20
    },
    btnContainerRegister:{
        marginTop:20,
        width: "95%"
    },
    btnRegister:{
        backgroundColor: "#6c00ff",
    },
    iconRight:{
        color: "#c1c1c1"
    }
})