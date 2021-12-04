import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screen/Account/Account";
import Register from "../screen/Account/Register";
import Graficos from "../components/Account/Graficos";
import BusquedaGraficos from "../components/Account/BusquedaGraficos";

const Stack= createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Account"
                component={Account}
                options={{title: "Mi cuenta"}}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{title: "Registro"}}
            />
            <Stack.Screen
                name="Graficos"
                component={Graficos}
                options={{title: "Seguimiento"}}
            />
            <Stack.Screen
                name="BusquedaGraficos"
                component={BusquedaGraficos}
                options={{title: "Seguimiento"}}
            />
        </Stack.Navigator>
    )
}