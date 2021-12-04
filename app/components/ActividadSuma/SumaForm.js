import React, {useRef, useState} from "react";
import { StyleSheet, View, Text} from "react-native";
import Toast from "react-native-easy-toast";
import { Input, Icon, Button} from "react-native-elements"
import { isEmpty } from "lodash";
import Loading from "../Loading";
import { State } from "react-native-gesture-handler";
import firebase from "../../utils/firebase";
import "firebase/auth";

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
    var count=0;

export default function SumaForm(props){
    const {toastRef} =props;
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(defaultFormValue());
    const [resultScore, setResultScore] = useState(count);

    const verificationResult = () =>{
        let verificacion1=numeroRandom1+numeroRandom2;
        let verificacion2=numeroRandom3+numeroRandom4;
        let verificacion3=numeroRandom5+numeroRandom6;
        let verificacion4=numeroRandom7+numeroRandom8;
        let verificacion5=numeroRandom9+numeroRandom10;
        
        let confirmacion1 = Boolean(verificacion1 === Number(resultData.resultado1))
        let confirmacion2 = Boolean(verificacion2 === Number(resultData.resultado2))
        let confirmacion3 = Boolean(verificacion3 === Number(resultData.resultado3))
        let confirmacion4 = Boolean(verificacion4 === Number(resultData.resultado4))
        let confirmacion5 = Boolean(verificacion5 === Number(resultData.resultado5))

        confirmacion1 ?  count=count+1 : count=count;
        confirmacion2 ?  count=count+1 : count=count;
        confirmacion3 ?  count=count+1 : count=count;
        confirmacion4 ?  count=count+1 : count=count;
        confirmacion5 ?  count=count+1 : count=count;
        resultCount = {count}
        //resultScore = [{count}]
    }

    const onSubmit = async() =>{
        if (
            isEmpty(resultData.resultado1) ||
            isEmpty(resultData.resultado2) ||
            isEmpty(resultData.resultado3) ||
            isEmpty(resultData.resultado4) ||
            isEmpty(resultData.resultado5) 
        ) {
            toastRef.current.show("Todos los campos son obligatorios")
         }
          else{
            
            const user = firebase.auth().currentUser;
            verificationResult();
            console.log(count);
//            firebase.firestore()
 //           .collection('register')
//            .onSnapshot((querySnapshot) => {
//                console.log(querySnapshot)
//  })
//            firebase.firestore().collection('register').on('child_added',snapshot =>{
//                this.count({
//                    count: this.state.count.concat(snapshot.val())
//                })
 //           })
            firebase.firestore().collection("register/"+user.uid+"/suma").doc(user.id).set(resultCount,{merge:true})
            console.log("OK!")

         }
    };

    const onChange = (e,type) =>{
        setResultData({...resultData,[type]: e.nativeEvent.text});
    };

    return(
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
                onChange={(e)=> onChange(e, "resultado2")}
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
    )
}

function defaultFormValue(){
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