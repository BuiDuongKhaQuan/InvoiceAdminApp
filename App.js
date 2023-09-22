import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Profile from './screen/Profile';
import Home from './screen/Home';

export default function App() {
    const Drawer = createDrawerNavigator();
    return (
        <>
            <NavigationContainer>
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
                                    }}
                                >
                                    <Image
                                        // source={User}
                                        style={{
                                            height: 130,
                                            width: 130,
                                            borderRadius: 65,
                                        }}
                                    />
                                </View>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                        );
                    }}
                    // screenOptions={{
                    //     drawerStyle: {
                    //         backgroundColor: '#fff',
                    //         width: 250,
                    //     },
                    //     headerStyle: {
                    //         backgroundColor: '#f4511e',
                    //     },
                    //     headerTintColor: '#fff',
                    //     headerTitleStyle: {
                    //         fontWeight: 'bold',
                    //     },
                    //     drawerLabelStyle: {
                    //         color: '#111',
                    //     },
                    // }}
                >
                    <Drawer.Screen
                        name="Name"
                        component={Home}
                        options={{
                            drawerLabel: 'Home',
                            title: 'Home',
                            drawerIcon: () => (
                                <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Product Management"
                        component={Profile}
                        options={{
                            drawerLabel: 'Product Management',
                            title: 'Product Management',
                            drawerIcon: () => (
                                <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />
                            ),
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
                            drawerIcon: () => <AntDesign name="user" size={24} color="black" />,
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
            </NavigationContainer>
        </>
    );
    // <Home />;
}

const styles = StyleSheet.create({});
