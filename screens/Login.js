import { StyleSheet, Text, View, Image, Keyboard, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidatePass } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { getCompaniesById, login } from '../Service/api';
import { useUserContext } from './UserContext'; // Đảm bảo thay đổi đường dẫn đúng
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { textColor } from '../constant/color';
import { statusBarHeight } from '../constant/dimistion';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login({ navigation }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const { dispatch } = useUserContext();
    const [loading, setLoading] = useState(false);

    const isValidateLogin = () => email.length > 0 && pass.length > 0 && errorEmail == false && errorPass == false;

    const handlePress = () => {
        if (!isValidateLogin()) {
            return;
        } else {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userData = await login(email, pass);
            if (userData.roles == 'ROLE_ADMIN') {
                dispatch({
                    type: 'SIGN_IN',
                    payload: userData,
                });
                navigation.navigate('Drawer');
            } else {
                Alert.alert(t('common:errLogin'), t('common:noAccess'));
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert(t('common:errLogin'), error.response.data.message);
            } else if (error.response && error.response.status === 404) {
                Alert.alert(t('common:errLogin'), error.response.data.message);
            } else {
                Alert.alert(t('common:errLogin'), t('common:transmissionError'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChangeEmail = (text) => {
        setErrorEmail(!isValidateEmail(text));
        setEmail(text);
    };

    const handleChangePass = (pass) => {
        setErrorPass(!isValidatePass(pass));
        setPass(pass);
    };

    return (
        <BackgroundImage>
            <ScrollView style={styles.container}>
                <Loading loading={loading} isFullScreen />
                <View style={styles.container_top}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                </View>
                <View style={styles.container_center}>
                    <Input
                        onChangeText={handleChangeEmail}
                        value={email}
                        validate={errorEmail}
                        validateText={t('common:formatEmail')}
                        holder="example@example.com"
                        iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangePass}
                        value={pass}
                        pass
                        holder={t('common:password')}
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                    />

                    <View style={styles.view_login}>
                        <View style={styles.btn_login}>
                            <Button onPress={handlePress} text={t('common:login')} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    image: {
        flex: 1,
    },
    container_top: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: statusBarHeight,
        width: 400,
        height: 400,
    },
    container_center: {
        flex: 4,
        alignItems: 'center',
    },
    view_login: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn_login: {
        flex: 1,
    },
    fingerprint: {
        flex: 0.18,
        alignItems: 'center',
    },
    register: {
        flexDirection: 'row',
    },
    register_text: {
        fontSize: fontSizeDefault,
    },
    register_btn: {
        fontSize: fontSizeDefault,
        fontWeight: '700',
        color: textColor,
    },
    container_botom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    forgot: {
        marginVertical: 20,
        fontSize: fontSizeDefault,
        color: textColor,
        fontWeight: 'bold',
    },
});
