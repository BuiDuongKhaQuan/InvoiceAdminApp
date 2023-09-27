import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
export default function EditCustomer() {
    return (
        <View style={styles.container}>
            <View style={styles.edit}>
                <View style={styles.icontilte}>
                    <Ionicons style={styles.icon} name="arrow-back-outline" size={28} color="black" />
                    <Text style={styles.text}>Edit Invoice</Text>
                </View>

                <View style={styles.icontilte1}>
                    <MaterialCommunityIcons name="delete-forever-outline" size={24} color="red" />
                    <Text style={styles.text1}>Delete Invoice</Text>
                </View>
            </View>
            <View style={styles.productname}>
                <Text style={styles.product}>First and last name</Text>
                <Input
                    validateText="Vui lòng nhập họ và tên"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                />
            </View>
            <View style={styles.productname}>
                <Text style={styles.product}>Email</Text>
                <Input
                    validateText="Vui lòng nhập địa chỉ email"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                />
            </View>
            <View style={styles.container_bottom1}>
                <Button text="Save changes" customStylesBtn={styles.btn} onPress={() => navigation.navigate('Login')} />
            </View>
            <View style={styles.container_bottom}>
                <Button
                    text="Cancel"
                    onPress={() => navigation.navigate('Login')}
                    customStylesBtn={styles.cancel}
                    customStylesText={{ color: 'black' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E8E5',
    },
    edit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        backgroundColor: 'white',
    },
    icontilte: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    icontilte1: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    text1: {
        color: 'red',
        fontSize: 20,
    },
    text: {
        fontSize: 20,
    },
    product: {
        marginTop: 30,
        marginHorizontal: 10,
        fontSize: 20,
    },
    input: {
        justifyContent: 'space-between',
        height: 50,
        width: 400,
        backgroundColor: 'white',
        borderColor: '#B1ACAC',
        borderRadius: 10,
    },
    btn: {
        width: 380,
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        // borderColor: white,
        // backgroundColor: buttonColor,
    },
    cancel: {
        backgroundColor: 'white',
        width: 380,
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
    container_bottom1: {
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 60,
    },
    container_bottom: {
        justifyContent: 'center',
        marginHorizontal: 20,
    },
});
