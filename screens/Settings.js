import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import SettingItem from '../components/SettingItem';
import Header from '../components/SettingItem/header';
import { AntDesign, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useUserContext } from './UserContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function Setting() {
    const { t } = useTranslation();
    const { dispatch } = useUserContext();
    const navigation = useNavigation();
    const [itemSetting, setItemSetting] = useState([
        {
            id: '2',
            title: t('common:application'),
            data: [
                {
                    id: '1',
                    icon: <MaterialIcons name="language" size={24} color="black" />,
                    title: t('common:language'),
                    router: 'Language',
                },
                {
                    id: '2',
                    icon: <Ionicons name="notifications-outline" size={24} color="black" />,
                    title: t('common:notification'),
                    router: 'Notification',
                },
            ],
        },
    ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={itemSetting}
                renderItem={({ item }) => {
                    return <SettingItem data={item} key={item.id} />;
                }}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.logoutContainer}>
                <Button
                    iconLeft={<SimpleLineIcons name="logout" size={24} color="black" />}
                    customStylesBtn={styles.logout_btn}
                    onPress={() => {
                        dispatch({
                            type: 'SIGN_OUT',
                        });
                        navigation.navigate('Login');
                    }}
                    text={t('common:logout')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoutContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    logout_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: '#B7B7B7',
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
