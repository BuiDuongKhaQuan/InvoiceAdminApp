import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { AntDesign } from '@expo/vector-icons';
import Input from '../Input';
import { createCompany, deleteCompany, updateProduct } from '../../Service/api';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../Loading';
import { useTranslation } from 'react-i18next';

export default function Popup({ visible, onClose, data }) {
    const { t } = useTranslation();
    const [product, setProduct] = useState(data);
    const [image, setImage] = useState(null);
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDesciption] = useState();
    const [loading, setLoading] = useState(false);
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const newStyle = keyboardIsShow ? { ...styles.container, height: '100%' } : { ...styles.container };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });

    const handleDelete = async () => {
        // setLoading(true);
        // try {
        //     const response = await deleteCompany(data.id);
        //     setProduct(response);
        //     console.log(response);
        // } catch (error) {
        //     console.error(' error:', error.response);
        // } finally {
        //     setLoading(false);
        // }
    };

    const handlerSend = async () => {
        setLoading(true);
        try {
            const response = await updateProduct(data.id, name, '1', price, description, '1');
            setProduct(response);
        } catch (error) {
            console.error(' error:', error.response.data.message);
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t('common:information')}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ ...styles.header_item, alignItems: 'flex-end', marginRight: 20 }}
                            onPress={onClose}
                        >
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.information}>
                            <View style={styles.input_item}>
                                <Text style={styles.title}>{t('common:name')}</Text>
                                <View style={styles.container_input}>
                                    <Input
                                        value={name}
                                        onChangeText={(name) => setName(name)}
                                        customStylesContainer={styles.input}
                                        holder={data ? data.name : 'common:enterName'}
                                    />
                                </View>
                            </View>
                            <View style={styles.input_item}>
                                <Text style={styles.title}>{t('common:price')}</Text>
                                <View style={styles.container_input}>
                                    <Input
                                        value={price}
                                        onChangeText={(price) => setPrice(price)}
                                        customStylesContainer={styles.input}
                                        holder={data ? data.price.toString() : 'common:enterValue'}
                                    />
                                </View>
                            </View>

                            <View style={styles.input_item}>
                                <Text style={styles.title}>{t('common:description')}</Text>
                                <View style={styles.container_input}>
                                    <Input
                                        value={description}
                                        onChangeText={(description) => setDesciption(description)}
                                        customStylesContainer={styles.input}
                                        holder={data ? data.description : 'common:enterValue'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Button
                        onPress={handlerSend}
                        customStylesText={styles.text}
                        customStylesBtn={styles.btn}
                        text={t('common:saveChanges')}
                    />

                    <Button
                        onPress={handleDelete}
                        customStylesText={styles.text}
                        customStylesBtn={styles.btn}
                        text={t('common:delete')}
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
        height: '50%',
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
    },
    img: {
        resizeMode: 'stretch',
        width: 90,
        height: 90,

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
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
    },
    container_input: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        elevation: 1,
        paddingLeft: 5,
        height: '60%',
        width: '95%',
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
        height: 35,
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 10,
    },
});
