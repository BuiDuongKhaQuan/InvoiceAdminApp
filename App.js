import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Profile from './screen/Profile';
import Home from './screen/Home';
import Welcome from './screen/Welcome';
import Login from './screen/Login';
import ForgotPassword from './screen/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './screen/DrawerNavigation';
import EditProducts from './screen/EditProducts';
import EditInvoice from './screen/EditInvoice';
import EditCustomer from './screen/EditCustomer';
import EditEnterprise from './screen/EditEnterprise';

export default function App() {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();
    const headerNone = { headerShown: false };
    return (

        // <Profile />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcom">
                <Stack.Screen name="Welcom" component={Welcome} options={headerNone} />

                <Stack.Screen name="Login" component={Login} options={headerNone} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={headerNone} />
                <Stack.Screen name="Profile" component={Profile} options={headerNone} />
                <Stack.Screen name="Home" component={Home} options={headerNone} />
                <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
        <EditEnterprise />
        // // <>
        //     // {/* <NavigationContainer>
        //         <Drawer.Navigator
        //             drawerContent={(props) => {
        //                 return (
        //                     <SafeAreaView>
        //                         <View
        //                             style={{
        //                                 height: 200,
        //                                 width: '100%',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center',
        //                                 borderBottomColor: '#ccc',
        //                                 borderBottomWidth: 1,
        //                             }}
        //                         >
        //                             <Image
        //                                 // source={User}
        //                                 style={{
        //                                     height: 130,
        //                                     width: 130,
        //                                     borderRadius: 65,
        //                                 }}
        //                             />
        //                         </View>
        //                         <DrawerItemList {...props} />
        //                     </SafeAreaView>
        //                 );
        //             }}
        //             // screenOptions={{
        //             //     drawerStyle: {
        //             //         backgroundColor: '#fff',
        //             //         width: 250,
        //             //     },
        //             //     headerStyle: {
        //             //         backgroundColor: '#f4511e',
        //             //     },
        //             //     headerTintColor: '#fff',
        //             //     headerTitleStyle: {
        //             //         fontWeight: 'bold',
        //             //     },
        //             //     drawerLabelStyle: {
        //             //         color: '#111',
        //             //     },
        //             // }}
        //         >
        //             <Drawer.Screen
        //                 name="Name"
        //                 component={Home}
        //                 options={{
        //                     drawerLabel: 'Home',
        //                     title: 'Home',
        //                     drawerIcon: () => (
        //                         <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />
        //                     ),
        //                 }}
        //             />
        //             <Drawer.Screen
        //                 name="Product Management"
        //                 component={Profile}
        //                 options={{
        //                     drawerLabel: 'Product Management',
        //                     title: 'Product Management',
        //                     drawerIcon: () => (
        //                         <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />
        //                     ),
        //                 }}
        //             />
        //             <Drawer.Screen
        //                 name="Ivoice Management"
        //                 component={Profile}
        //                 options={{
        //                     drawerLabel: 'Ivoice Management',
        //                     title: 'Ivoice Management',
        //                     drawerIcon: () => <FontAwesome5 name="file-invoice" size={24} color="black" />,
        //                 }}
        //             />
        //             <Drawer.Screen
        //                 name="Customer Management"
        //                 component={Profile}
        //                 options={{
        //                     drawerLabel: 'Customer Management',
        //                     title: 'Customer Management',
        //                     drawerIcon: () => <AntDesign name="user" size={24} color="black" />,
        //                 }}
        //             />
        //             <Drawer.Screen
        //                 name="Business Management"
        //                 component={Profile}
        //                 options={{
        //                     drawerLabel: 'Business Management',
        //                     title: 'Business Management',
        //                     drawerIcon: () => <MaterialCommunityIcons name="warehouse" size={24} color="black" />,
        //                 }}
        //             />
        //             <Drawer.Screen
        //                 name="Logout"
        //                 component={Profile}
        //                 options={{
        //                     drawerLabel: 'Logout',
        //                     title: 'Logout',
        //                     drawerIcon: () => <Entypo name="log-out" size={24} color="black" />,
        //                 }}
        //             />
        //         </Drawer.Navigator>
        //     </NavigationContainer>
        // </> */}
    );
}

const styles = StyleSheet.create({});
