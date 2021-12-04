import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AccountStack from "./AccountStack";
//import Actividades from "../screen/Actividades"
//import ActividadSuma from "../screen/Actividades/ActividadSuma";
import Activity from "../screen/Actividades/Activity"
import ActivityStack from "./ActivityStack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//<Tab.Navigator initialRouteName="account" screenOptions={({route})=> ({
//    tabBarIcon:({color, size}) => screenOptions (route, color), tabBarActiveTintColor: "#6c00ff", 
//})}
//>
const Tab = createBottomTabNavigator();
export default function Navigation (){
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName="account" screenOptions={({route})=> ({
                tabBarIcon:({focused, color, size}) => {
                    let iconName;
                    if (route.name === "account"){
                        iconName = focused ? 'account-circle' : 'account-circle-outline';
                    }
                    else if(route.name ==="ActivityStack"){
                        iconName = focused ? 'controller-classic' : 'controller-classic-outline'
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor:'#6c00ff',
                tabBarInactiveTintColor: 'gray'
            })}
            >
                <Tab.Screen name="account" component={AccountStack} options={{title: "Cuenta", size:100}}/>
                <Tab.Screen name="ActivityStack" component={ActivityStack} options={{title: "Actividades"}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}