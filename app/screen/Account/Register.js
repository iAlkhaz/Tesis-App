import React, {useRef} from "react";
import { StyleSheet, View, Text} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register () {
    const toastRef = useRef();

    return (
        <KeyboardAwareScrollView>
            <View style={styles.viewForm}>
                <RegisterForm toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    )
}

const styles= StyleSheet.create({
    viewForm:{
        marginRight: 40,
        marginLeft: 40
    }
})