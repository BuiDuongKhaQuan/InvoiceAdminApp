import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './screens/DrawerNavigation';
import { UserProvider } from './screens/UserContext';
import ChangePassword from './screens/ChangePassword';

export default function App() {
    const Stack = createNativeStackNavigator();
    const headerNone = { headerShown: false };
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={headerNone} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={headerNone} />
                    <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}

const styles = StyleSheet.create({});
