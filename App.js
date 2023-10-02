import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './screens/DrawerNavigation';
import EditProducts from './screens/EditProducts';
import EditInvoice from './screens/EditInvoice';
import EditCustomer from './screens/EditCustomer';
import EditEnterprise from './screens/EditEnterprise';
import { UserProvider } from './screens/UserContext';
import Bill from './screens/Bill';
import Company from './screens/Company';
import Customer from './screens/Customer';

export default function App() {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();
    const headerNone = { headerShown: false };
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={headerNone} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={headerNone} />
                    <Stack.Screen name="Profile" component={Profile} options={headerNone} />
                    <Stack.Screen name="Home" component={Home} options={headerNone} />
                    <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
                    <Stack.Screen name="Bill" component={Bill} options={{ headerShown: false }} />
                    <Stack.Screen name="Company" component={Company} options={{ headerShown: false }} />
                    <Stack.Screen name="EditCustomer" component={EditCustomer} options={{ headerShown: false }} />
                    <Stack.Screen name="EditEnterprise" component={EditEnterprise} options={{ headerShown: false }} />
                    <Stack.Screen name="EditInvoice" component={EditInvoice} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
        // <EditCustomer />
    );
}

const styles = StyleSheet.create({});
