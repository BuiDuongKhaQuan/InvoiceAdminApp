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
    );
}

const styles = StyleSheet.create({});
