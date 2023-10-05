import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Input from '../Input';
import { deleteUser, getCompaniesById, getUserByEmail, updateStatus, updateUser } from '../../Service/api';
import SelectDropdown from 'react-native-select-dropdown';
import Loading from '../Loading';

export default function Popup({ visible, onClose, data }) {
    const [user, setUser] = useState(data);
    const [company, setCompany] = useState('');
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [role, setRole] = useState();
    const [gender, setGender] = useState();
    const [loading, setLoading] = useState(false);
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);

    const genders = ['Male', 'Female'];
    const roles = ['ROLE_ADMIN', 'ROLE_MOD', 'ROLE_USER', 'ROLE_GUEST'];
    const newStyle = keyboardIsShow ? { ...styles.container, height: '100%' } : { ...styles.container };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });
    useEffect(() => {
        const getCompany = async () => {
            try {
                const company = await getCompaniesById(data.companyId);
                setCompany(company.name);
            } catch (error) {
                console.log(error);
            }
        };
        getCompany();
    }, [data]);

    const handleLockup = async () => {
        setLoading(true);
        try {
            const response = await updateStatus(data.id, '3');
            setUser(response);
            Alert.alert('Success');
        } catch (error) {
            Alert.alert('Error', 'Transmission error, please try again later!');
        } finally {
            setLoading(false);
        }
    };
    const handleUnlock = async () => {
        setLoading(true);
        try {
            const response = await updateStatus(data.id, '1');
            Alert.alert('Success');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Transmission error, please try again later!');
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await deleteUser(data.id);
            Alert.alert('Success');
        } catch (error) {
            Alert.alert('Error', 'Transmission error, please try again later!');
        } finally {
            setLoading(false);
        }
    };

    const handlerSend = async () => {
        setLoading(true);
        try {
            await updateUser(data.id, fullName, role, address, gender, phone);
            Alert.alert('Success');
        } catch (error) {
            Alert.alert('Error', 'Transmission error, please try again later!');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={newStyle}>
                <Loading loading={loading} />
                <View style={styles.top}>
                    <View style={styles.header}>
                        <View style={styles.header_item}></View>
                        <View style={styles.header_item}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Information</Text>
                        </View>
                        <TouchableOpacity
                            style={{ ...styles.header_item, alignItems: 'flex-end', marginRight: 20 }}
                            onPress={onClose}
                        >
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.avartar}>
                            <Image
                                source={
                                    data.image == null
                                        ? require('../../assets/images/default-avatar.png')
                                        : { uri: data.image }
                                }
                                style={styles.img}
                            />
                            <Text style={styles.text}>{data.name}</Text>
                        </View>
                        <View style={styles.information}>
                            <View style={styles.input_item}>
                                <Text style={styles.title}>Full name</Text>
                                <Input
                                    value={fullName}
                                    onChangeText={(name) => setFullName(name)}
                                    customStylesContainer={styles.input}
                                    holder={data.name}
                                />
                            </View>
                            <View style={styles.input_item}>
                                <Text style={styles.title}>Email</Text>
                                <Input
                                    value={email}
                                    onChangeText={(email) => setEmail(email)}
                                    customStylesContainer={styles.input}
                                    holder={data.email}
                                />
                            </View>
                            <View style={styles.input_item}>
                                <Text style={styles.title}>Address</Text>
                                <Input
                                    value={address}
                                    onChangeText={(address) => setAddress(address)}
                                    customStylesContainer={styles.input}
                                    holder={data.phone}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={styles.center_item}>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>Phone</Text>
                            <Input
                                value={phone}
                                onChangeText={(phone) => setPhone(phone)}
                                customStylesContainer={styles.input}
                                holder={data.phone}
                            />
                        </View>

                        <View style={styles.input_item}>
                            {company != null ? (
                                <>
                                    <Text style={styles.title}>Company</Text>
                                    <Input value={company} customStylesContainer={styles.input} holder={company} />
                                </>
                            ) : (
                                <View>
                                    <Text style={styles.title}>ADMIN</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.center_item}>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>Gender</Text>
                            <SelectDropdown
                                data={genders}
                                onSelect={(selectedItem, index) => {
                                    setGender(selectedItem);
                                }}
                                buttonStyle={styles.dropdown_btn}
                                defaultButtonText={data.gender}
                                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                                dropdownIconPosition="right"
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>Role</Text>
                            <SelectDropdown
                                data={roles}
                                onSelect={(selectedItem, index) => {
                                    setRole(selectedItem);
                                }}
                                buttonStyle={styles.dropdown_btn}
                                defaultButtonText={data.roles}
                                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                                dropdownIconPosition="right"
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button
                        onPress={handlerSend}
                        customStylesText={styles.text}
                        customStylesBtn={styles.btn}
                        text="Save change"
                    />
                    {user.status === 1 && (
                        <Button
                            onPress={handleLockup}
                            customStylesText={styles.text}
                            customStylesBtn={styles.btn}
                            text="Lockup"
                        />
                    )}
                    {user.status === 2 && (
                        <Button
                            onPress={handleUnlock}
                            customStylesText={styles.text}
                            customStylesBtn={styles.btn}
                            text="Unlock"
                        />
                    )}
                    <Button
                        customStylesText={styles.text}
                        onPress={
                            user.status === 2
                                ? () => Alert.alert('', 'The account has been deleted before')
                                : handleDelete
                        }
                        customStylesBtn={user.status === 2 ? { ...styles.btn, backgroundColor: 'red' } : styles.btn}
                        text="Delete"
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: '60%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'black',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    top: {
        flex: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    header_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    avartar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 10,
    },
    img: {
        resizeMode: 'stretch',
        width: 90,
        height: 90,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'gray',
    },
    text: {
        fontSize: fontSizeDefault,
        textAlign: 'center',
    },
    information: {
        flex: 1,
        marginTop: 10,
    },
    input_item: {
        flex: 1,
        marginBottom: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
    },
    input: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        elevation: 1,
        height: 30,
    },
    center: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    center_item: {
        flex: 1,
        flexDirection: 'row',
    },
    bottom: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: -5,
    },
    btn: {
        flex: 1,
        height: 35,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    dropdown_btn: {
        marginTop: 10,
        height: 30,
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 10,
    },
});