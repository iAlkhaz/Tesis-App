import React, {useState, useRef} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props){
    const {setShowModal, toastRef} =props;
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState({});
    const [isLoading,setIsLoading] = useState(false);

    const onChange = (e,type) =>{
        setFormData({...formData,[type]: e.nativeEvent.text})
    }

    const onSubmit = async() =>{
        let isSetError = true;
        let errorsTemp = {};
        setErrors({});
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorsTemp= {
                password: !formData.password ? "La contraseña no puede estar vacia" : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacia" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacia" : "",
            }
        }else if(formData.newPassword !== formData.repeatNewPassword){
            errorsTemp= {
                newPassword: "Las contraseñas no son iguales",
                repeatNewPassword: "Las contraseñas no son iguales"
            }
        }else if(size(formData.newPassword)<6){
            errorsTemp= {
                newPassword: "La contraseña debe ser minimo de 6 caracteres",
                repeatNewPassword: "La contraseña debe ser minimo de 6 caracteres"
            }
        }else{
            setIsLoading(true);
            await reauthenticate(formData.password).then(async()=>{   
                await firebase.auth().currentUser.updatePassword(formData.newPassword).then(()=>{
                    isSetError = false;
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(()=>{
                    errorsTemp={
                        other: "Erros al intentar actualizar la contraseña"
                    }
                    setIsLoading(false)
                })
            }).catch(()=>{
                setIsLoading(false);
                errorsTemp={
                    password: "La contraseña no es correcta"
                }
            })
        }
        isSetError && setErrors(errorsTemp);
    }

    return(
        <View style={styles.view}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword1 ? false : true}
                rightIcon={{
                    type:"material-community",
                    name: showPassword1 ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () =>!setShowPassword1(!showPassword1)
                }}
                onChange={(e)=> onChange(e,"password")}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword2 ? false : true}
                rightIcon={{
                    type:"material-community",
                    name: showPassword2 ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () =>!setShowPassword2(!showPassword2)
                }}
                onChange={(e)=> onChange(e,"newPassword")}
                errorMessage={errors.newPassword}
            />
            <Input
                placeholder="Repita la nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword3 ? false : true}
                rightIcon={{
                    type:"material-community",
                    name: showPassword3 ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () =>!setShowPassword3(!showPassword3)
                }}
                onChange={(e)=> onChange(e,"repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    )
}

function defaultValue(){
    return{
        password: "",
        newPassword: "",
        repeatNewPassword: ""
    }
}

const styles= StyleSheet.create({
    view:{
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: "95%"
    },
    btn:{
        backgroundColor: "#6c00ff"
    }
})