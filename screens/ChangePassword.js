import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import { isValidatePass } from '../utilies/validate';
import Input from '../components/Input';
import Header from '../components/SettingItem/header';
import { fontSizeDefault, fontSizeMenuTitle } from '../constant/fontSize';
import { changePassword } from '../Service/api';
import { useUserContext } from './UserContext';
import Loading from '../components/Loading';

export default function ChangePassword({ navigation }) {
    const { state } = useUserContext();
    const [passOld, setPassOld] = useState('');
    const [passNew, setPassNew] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorPassOld, setErrorPassOld] = useState(false);
    const [errorPassNew, setErrorPassNew] = useState(false);
    const [errorConfirmPass, setErrorConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValidateContrinute = () =>
        passOld.length > 0 &&
        errorPassOld == false &&
        passNew.length > 0 &&
        errorPassNew == false &&
        confirmPass > 0 &&
        errorConfirmPass == false &&
        confirmPass == passNew;
    const handlePress = () => {
        if (!isValidateContrinute()) {
            return;
        } else {
            changePass();
        }
    };
    const changePass = async () => {
        setLoading(true);
        try {
            const response = await changePassword(state.user.email, passOld, passNew, confirmPass);
            Alert.alert('', 'Successfully changed password');
            navigation.navigate('Profile');
        } catch (error) {
            Alert.alert('', 'Error networking');
        } finally {
            setLoading(false);
        }
    };
    const handleChangePassOld = (text) => {
        setErrorPassOld(!isValidatePass(text));
        setPassOld(text);
    };
    const handleChangePassNew = (text) => {
        setErrorPassNew(!isValidatePass(text));
        setPassNew(text);
    };
    const handleChangeConfirm = (text) => {
        setErrorConfirmPass(passNew != text ? true : false);
        setConfirmPass(text);
    };
    return (
        <View style={{ flex: 1 }}>
            <Loading loading={loading} />
            <Header title="Password" />
            <ScrollView style={styles.container}>
                <View style={styles.content_center}>
                    <Text style={styles.content_title}>Change password</Text>
                    <Input
                        text
                        customStylesInput={styles.input}
                        customStylesContainer={styles.inputContainer}
                        customStylesTextValidate={styles.textValidate}
                        validate={errorPassOld}
                        validateText="Incorrect password"
                        onChangeText={handleChangePassOld}
                        holder="Old password"
                        value={passOld}
                    />
                    <Input
                        text
                        customStylesInput={styles.input}
                        customStylesContainer={styles.inputContainer}
                        customStylesTextValidate={styles.textValidate}
                        validate={errorPassNew}
                        validateText="Password must be 6 to 8 characters"
                        onChangeText={handleChangePassNew}
                        holder="New password"
                        value={passNew}
                    />

                    <Input
                        text
                        customStylesInput={styles.input}
                        customStylesContainer={styles.inputContainer}
                        customStylesTextValidate={styles.textValidate}
                        validate={errorConfirmPass}
                        validateText="Password incorrect"
                        onChangeText={handleChangeConfirm}
                        holder="Re new password"
                        value={confirmPass}
                    />

                    <Button
                        onPress={handlePress}
                        customStylesBtn={{ width: 340, height: 50, marginLeft: 24 }}
                        text="Confirm"
                    />

                    <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
                        Forgot password?
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content_center: {
        flex: 1,
    },
    content_title: {
        fontSize: fontSizeMenuTitle,
        marginTop: 15,
        marginLeft: 10,
        marginBottom: 20,
    },
    input: {
        marginLeft: 20,
        textAlign: 'left',
    },
    inputContainer: {
        marginTop: -5,
        alignItems: 'flex-start',
    },
    textValidate: {
        marginLeft: 20,
    },
    forgot: {
        marginBottom: 20,
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        color: '#26B819',
        alignItems: 'center',
        textAlign: 'center',
    },
});
