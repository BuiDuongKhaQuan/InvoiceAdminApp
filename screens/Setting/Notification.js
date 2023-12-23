import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import SwitchCustom from '../../components/Switch';
import Header from '../../components/SettingItem/header';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification() {
    const { t } = useTranslation();
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    useEffect(() => {
        // Load notification status from AsyncStorage when the component mounts
        loadNotificationStatus();
    }, []);

    useEffect(() => {
        // Save notification status to AsyncStorage whenever notificationEnabled changes
        saveNotificationStatus(notificationEnabled);
    }, [notificationEnabled]);

    const loadNotificationStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('notificationStatus');
            if (value !== null) {
                setNotificationEnabled(value === 'true');
            }
        } catch (error) {
            console.error('Error loading notification status:', error);
        }
    };

    const saveNotificationStatus = async (value) => {
        try {
            // Save notification status to AsyncStorage
            await AsyncStorage.setItem('notificationStatus', value.toString());
        } catch (error) {
            console.error('Error saving notification status:', error);
        }
    };

    const handleSwitchChange = (value) => {
        setNotificationEnabled(value);
    };

    return (
        <BackgroundImage>
            <Header title={t('common:notification')} />
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                    <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                        {t('common:notify')}
                    </Text>
                    <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>{t('common:notification')}</Text>
                            {/* <SwitchCustom onValueChange={handleSwitchChange} value={notificationEnabled} /> */}
                        </View>
                        <Text style={{ color: 'gray', paddingHorizontal: 10 }}>{t('common:note')}</Text>
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
