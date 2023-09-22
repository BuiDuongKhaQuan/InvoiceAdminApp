import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Home from './Home';
import Profile from './Profile';
export default function DrawerNavigation() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerContent={(props) => {
                return (
                    <SafeAreaView>
                        <View
                            style={{
                                height: 200,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                backgroundColor: '#ccc',
                            }}
                        >
                            <Image
                                source={require('../assets/icons/account.png')}
                                style={{ width: 90, height: 90, borderRadius: 65 }}
                            />
                            <Text>Name</Text>
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
                component={Profile}
                options={{
                    drawerLabel: 'Product Management',
                    title: 'Product Management',
                    drawerIcon: () => <AntDesign name="profile" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Ivoice Management"
                component={Profile}
                options={{
                    drawerLabel: 'Ivoice Management',
                    title: 'Ivoice Management',
                    drawerIcon: () => <FontAwesome5 name="file-invoice" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Customer Management"
                component={Profile}
                options={{
                    drawerLabel: 'Customer Management',
                    title: 'Customer Management',
                    drawerIcon: () => <MaterialCommunityIcons name="account-group" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Business Management"
                component={Profile}
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
const styles = StyleSheet.create({});
