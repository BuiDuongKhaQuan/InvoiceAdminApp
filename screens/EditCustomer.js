import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/SettingItem/header';
import { fontSizeDefault } from '../constant/fontSize';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';

export default function EditCustomer() {
    const genders = ['Male', 'Female'];
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <View style={styles.container}>
            <Header
                title="Edit customer"
                iconRight={<MaterialCommunityIcons name="delete-forever-outline" size={24} color="red" />}
            />
            <ScrollView style={{ marginTop: 10 }}>
                <View style={styles.content}>
                    <Text style={styles.title}>Full name</Text>
                    <View style={styles.input}>
                        <Input
                            validateText="Vui lòng nhập họ và tên"
                            customStylesContainer={styles.inputContainer}
                            customStylesInput={styles.inputInput}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Phone</Text>
                    <View style={styles.input}>
                        <Input
                            validateText="Vui lòng nhập họ và tên"
                            customStylesContainer={styles.inputContainer}
                            customStylesInput={styles.inputInput}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Email</Text>
                    <View style={styles.input}>
                        <Input
                            validateText="Vui lòng nhập họ và tên"
                            customStylesContainer={styles.inputContainer}
                            customStylesInput={styles.inputInput}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Company</Text>
                    <View style={styles.input}>
                        <Input
                            validateText="Vui lòng nhập họ và tên"
                            customStylesContainer={styles.inputContainer}
                            customStylesInput={styles.inputInput}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Company</Text>
                    <View style={styles.dropdown}>
                        <SelectDropdown
                            data={genders}
                            onSelect={(selectedItem, index) => {
                                setSelectedGender(selectedItem);
                            }}
                            buttonStyle={styles.dropdown_btn}
                            // defaultButtonText={state.user.gender}
                            renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                            dropdownIconPosition="right"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item;
                            }}
                        />
                    </View>
                </View>

                <View style={styles.container_bottom}>
                    <Button
                        text="Save changes"
                        customStylesBtn={styles.btn}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E8E5',
    },
    content: {
        height: 70,
        flex: 1,
    },
    title: {
        fontSize: fontSizeDefault,
    },
    input: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    inputContainer: {
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 0,
        paddingVertical: 10,
        width: '100%',
        height: '70%',
    },
    inputInput: {
        marginLeft: 10,
    },
    container_bottom: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    btn: {
        borderWidth: 1,
        width: '100%',
        height: '30%',
        borderRadius: 5,
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});
