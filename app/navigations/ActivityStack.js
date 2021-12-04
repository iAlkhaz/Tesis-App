import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activity from "../screen/Actividades/Activity";
import ActivityLogicList from "../screen/Actividades/ActivityList";
import Suma from "../components/ActividadSuma/Suma";
import Resta from "../components/ActividadSuma/Resta";

const Stack= createStackNavigator();

export default function ActivityStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Activity"
                component={Activity}
                options={{title: "Categoria de actividades"}}
            />
            <Stack.Screen
                name="ActivityLogicList"
                component={ActivityLogicList}
                options={{title: "Lista de actividades"}}
            />
            <Stack.Screen
                name="Suma"
                component={Suma}
                options={{title: "Actividad Suma"}}
            />
            <Stack.Screen
                name="Resta"
                component={Resta}
                options={{title: "Actividad Resta"}}
            />
        </Stack.Navigator>
    )
}