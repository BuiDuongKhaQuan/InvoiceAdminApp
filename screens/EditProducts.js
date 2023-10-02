import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import Input from '../components/Input';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../components/Button';

export default function EditProducts() {
    return (
        <View style={styles.container}>
            <View style={styles.time}>
                <Text>List of products</Text>
                <Text>Tuesday, September 12, 2023 - 7:50 PM</Text>
            </View>
            <View style={styles.edit}>
                <View style={styles.icontilte}>
                    <Ionicons style={styles.icon} name="arrow-back-outline" size={28} color="black" />
                    <Text style={styles.text}>Edit Products</Text>
                </View>

                <View style={styles.icontilte1}>
                    <MaterialCommunityIcons name="delete-forever-outline" size={24} color="red" />
                    <Text style={styles.text1}>Delete Products</Text>
                </View>
            </View>
            <View style={styles.productname}>
                <Text style={styles.product}>Product name</Text>
                <Input
                    validateText="Vui lòng nhập tên của sản phẩm"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                />
            </View>
            <View style={styles.productname}>
                <Text style={styles.product}>Quantity</Text>
                <Input
                    validateText="Vui lòng nhập số lượng"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                />
            </View>
            <View style={styles.productname}>
                <Text style={styles.product}>Price</Text>
                <Input
                    validateText="Vui lòng nhập giá tiền"
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
    input: {
        justifyContent: 'space-between',
        height: 50,
        width: 400,
        backgroundColor: 'white',
        borderColor: '#B1ACAC',
        borderRadius: 10,
    },
    time: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 50,
        width: '100%',
        borderRadius: 10,
        borderColor: '#B1ACAC',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icontilte: {
        flexDirection: 'row',
    },
    icontilte1: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    text: {
        fontSize: 20,
    },
    edit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    text1: {
        fontSize: 20,
        color: 'red',
    },
    product: {
        marginTop: 40,
        marginHorizontal: 10,
        fontSize: 20,
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
});
