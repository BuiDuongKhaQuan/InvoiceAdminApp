import { StyleSheet, Text, View, Image, Keyboard, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidateCode } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword({ navigation }) {
    const { t } = useTranslation();
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorCode, setErrorCode] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });

    const centerStyle = keyboardIsShow
        ? { ...styles.container_center, flex: 2, justifyContent: 'center' }
        : { ...styles.container_center };

    const isValidateConfirm = () => code.length > 0 && errorCode == false;

    const handlePress = () => {
        if (!isValidateConfirm()) {
            return;
        } else {
            alert(isValidateConfirm());
        }
    };

    const handleChangeEmail = (text) => {
        setErrorEmail(!isValidateEmail(text));
        setEmail(text);
    };
    const handleChangeCode = (text) => {
        setErrorCode(!isValidateCode(text));
        setCode(text);
    };
    return (
        <View style={styles.container}>
            {/* <BackgroundImage> */}
            <View style={styles.container_top}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.title}>Invoice C</Text>
            </View>

            <View style={centerStyle}>
                <Input
                    onChangeText={handleChangeEmail}
                    value={email}
                    validate={errorEmail}
                    validateText={t('common:format')}
                    holder="Email"
                    iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                    btnSend
                />
                <Input
                    onChangeText={handleChangeCode}
                    value={code}
                    validate={errorCode}
                    validateText={t('common:verifyCode')}
                    customStylesInput={{ marginLeft: 50 }}
                    holder={t('common:verify')}
                />

                {keyboardIsShow || (
                    <>
                        <Button onPress={handlePress} text={t('common:confirm')} customStylesBtn={styles.btn} />
                    </>
                )}
            </View>
            {/* </BackgroundImage> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E8E5',
    },
    container_top: {
        flex: 4,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 70,
        marginTop: -10,
        marginBottom: 10,
        color: '#B3B70A',
        textShadowColor: '#2AA50B',
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 2 },
    },

    container_center: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        color: '#26B819',
    },
    btn: {
        width: 347,
    },
});
