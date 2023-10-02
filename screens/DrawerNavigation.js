import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Home from './Home';
import Profile from './Profile';
import { useUserContext } from './UserContext';
import Bill from './Bill';
import Customer from './Customer';
import Company from './Company';
import Products from './Products';

export default function DrawerNavigation() {
    const Drawer = createDrawerNavigator();
    const { state } = useUserContext();
    return (
        <Drawer.Navigator
            drawerContent={(props) => {
                return (
                    <SafeAreaView>
                        <View style={styles.container}>
                            <Image
                                style={styles.wallpaper}
                                source={
                                    state.user.wallpaper == null
                                        ? require('../assets/images/default-wallpaper.png')
                                        : { uri: state.user.wallpaper }
                                }
                            />
                            <Image
                                source={
                                    state.user.image == null
                                        ? require('../assets/images/default-avatar.png')
                                        : { uri: state.user.image }
                                }
                                style={styles.avartar}
                            />
                            <Text style={styles.name}>{state.user.name}</Text>
                        </View>
                        <DrawerItemList {...props} />
                    </SafeAreaView>
                );
            }}
        >
            <Drawer.Screen
                name="Name"
                component={Home}
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: () => <MaterialIcons name="house" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    drawerLabel: 'Profile',
                    title: 'Profile',
                    drawerIcon: () => <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Product Management"
                component={Products}
                options={{
                    drawerLabel: 'Product Management',
                    title: 'Product Management',
                    drawerIcon: () => <AntDesign name="profile" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Invoice Management"
                component={Bill}
                options={{
                    drawerLabel: 'Invoice Management',
                    title: 'Invoice Management',
                    drawerIcon: () => <FontAwesome5 name="file-invoice" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Customer Management"
                component={Customer}
                options={{
                    drawerLabel: 'Customer Management',
                    title: 'Customer Management',
                    drawerIcon: () => <MaterialCommunityIcons name="account-group" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Business Management"
                component={Company}
                options={{
                    drawerLabel: 'Business Management',
                    title: 'Business Management',
                    drawerIcon: () => <MaterialCommunityIcons name="warehouse" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={Profile}
                options={{
                    drawerLabel: 'Logout',
                    title: 'Logout',
                    drawerIcon: () => <Entypo name="log-out" size={24} color="black" />,
                }}
            />
        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#ccc',
    },
    wallpaper: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    avartar: {
        width: 90,
        height: 90,
        borderRadius: 65,
        borderWidth: 1,
        borderColor: 'gray',
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 5,
        borderRadius: 5,
    },
});
