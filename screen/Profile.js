import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { MaterialCommunityIcons, Feather, AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Input from '../components/Input';

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <View style={styles.top_avatar}>
                    <View style={styles.top_}>
                        <Image style={styles.avatar} source={require('../assets/icons/account.png')} />
                        <MaterialIcons
                            name="add-a-photo"
                            size={24}
                            color="black"
                            style={{
                                marginTop: -33,
                                marginLeft: 60,
                                backgroundColor: '#FD6D6D',
                                borderRadius: 30,
                                padding: 4,
                            }}
                        />

                        <Text style={styles.name}>Name</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container_center}>
                <Text style={styles.name}>Họ và tên</Text>
                <Input
                    validateText="Vui lòng nhập đúng định dạng email"
                    holder="Nhập tên"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                    iconLeft={<MaterialCommunityIcons name="account" size={24} color="black" />}
                />
                <Text style={styles.name}>Email</Text>
                <Input
                    // validateText="Vui lòng nhập đúng định dạng email"
                    holder="Nhập email"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                    iconLeft={<MaterialIcons name="email" size={24} color="black" />}
                />
                <Text style={styles.name}>Password</Text>
                <Input
                    // validateText="Vui lòng nhập đúng định dạng email"
                    holder="Nhập password"
                    customStylesContainer={styles.input}
                    customStylesInput={styles.input1}
                    iconLeft={
                        <MaterialCommunityIcons name="key-variant" size={24} color="black" style={{ left: 20 }} />
                    }
                    iconRight={<FontAwesome5 name="chevron-right" size={24} color="black" />}
                    customStylesIcon={{}}
                />
            </View>
            <View style={styles.container_bottom}>
                <Button text="Lưu" customStylesBtn={styles.btn} onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#E4E8E5',
    },
    container_top: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        flex: 2.3,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    img_default: {
        flex: 2,
        width: 10,
        resizeMode: 'stretch',
    },
    top_avatar: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    avatar: {
        width: 90,
        height: 90,
        resizeMode: 'stretch',
    },
    top_: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container_center: {
        flex: 3,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 10,
        marginTop: 40,
    },
    backgroundIcon: {
        height: 30,
        backgroundColor: 'blue',
    },
    name: {
        marginHorizontal: 10,
        color: '#806969',
    },
    input: {
        flexDirection: 'column',
        width: 345,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: 'white',
        shadowColor: 'white',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 5,
        fontSize: 12,
    },
    input1: {
        fontSize: 15,
    },
    container_bottom: {
        marginVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 40,
    },
    btn: {
        width: 345,
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
});
