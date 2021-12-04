import React, {useState} from "react";
import { StyleSheet, View, Text, RefreshControlBase} from "react-native";
import { Input, Icon, Button} from "react-native-elements"
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading"


export default function SumaForm (props) {
    const {toastRef} =props;
//    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = () =>{
        if (
            isEmpty(formData.resultado1) ||
            isEmpty(formData.resultado2) ||
            isEmpty(formData.resultado3) ||
            isEmpty(formData.resultado4) ||
            isEmpty(formData.resultado5) 
        ) {
            toastRef.current.show("Todos los campos son obligatorios")
         }
          else{
            console.log(formData)
         }
    };

    const onChange = (e,type) =>{
        setFormData({...formData,[type]: e.nativeEvent.text});
    };
//    const generadorNumeroRandom = () => {
//        for ( let i = 0; i < 2; i++) {
            var numeroRandom1 = Math.floor(Math.random() * 100);
            var numeroRandom2 = Math.floor(Math.random() * 100);
            var numeroRandom3 = Math.floor(Math.random() * 100);
            var numeroRandom4 = Math.floor(Math.random() * 100);
            var numeroRandom5 = Math.floor(Math.random() * 100);
            var numeroRandom6 = Math.floor(Math.random() * 100);
            var numeroRandom7 = Math.floor(Math.random() * 100);
            var numeroRandom8 = Math.floor(Math.random() * 100);
            var numeroRandom9 = Math.floor(Math.random() * 100);
            var numeroRandom10 = Math.floor(Math.random() * 100);
 //        }
//    }
    const verificacion = () =>{
        if(resultado === true){
           var puntaje=+puntaje
        }
    }
    return (
        <KeyboardAwareScrollView >
            <View style={styles.formContainer}>
            <Text>{numeroRandom1} + {numeroRandom2}</Text>
            <Input 
                keyboardType="numeric"
                placeholder="Resultado" 
                containerStyle={styles.inputForm}
                onChange={(e)=> onChange(e, "resultado1")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="numeric"
                        iconStyle={styles.iconRight}
                    />}
            />
            <Text>{numeroRandom3} + {numeroRandom4}</Text>
            <Input 
                keyboardType="numeric"
                placeholder="Resultado" 
                containerStyle={styles.inputForm}
                onChange={(e)=> onChange(e, "resultando2")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="numeric"
                        iconStyle={styles.iconRight}
                    />}
            />
            <Text>{numeroRandom5} + {numeroRandom6}</Text>
            <Input 
                keyboardType="numeric"
                placeholder="Resultado" 
                containerStyle={styles.inputForm}
                onChange={(e)=> onChange(e, "resultado3")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="numeric"
                        iconStyle={styles.iconRight}
                    />}
            />
            <Text>{numeroRandom7} + {numeroRandom8}</Text>
            <Input 
                keyboardType="numeric"
                placeholder="Resultado" 
                containerStyle={styles.inputForm}
                onChange={(e)=> onChange(e, "resultado4")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="numeric"
                        iconStyle={styles.iconRight}
                    />}
            />
            <Text>{numeroRandom9} + {numeroRandom10}</Text>
            <Input 
                keyboardType="numeric"
                placeholder="Resultado" 
                containerStyle={styles.inputForm}
                onChange={(e)=> onChange(e, "resultado5")}
                rightIcon={
                    <Icon 
                        type="material-community" 
                        name="numeric"
                        iconStyle={styles.iconRight}
                    />}
            />


            <Button title="Enviar respuestas" containerStyle={styles.btnContainerRegister} buttonStyle={styles.btnRegister} onPress={onSubmit}/>
            </View>
        </KeyboardAwareScrollView>
  );
};

function defaultFormValue(){
    console.log(formData)
    return{
        resultado1:"",
        resultado2:"",
        resultado3:"",
        resultado4:"",
        resultado5:"",
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
    }
})