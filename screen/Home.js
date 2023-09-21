import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import { backgroundColor } from '../constant/color';
import Button from '../components/Button';
export default function Home() {
    const [item, setItem] = useState([
        {
            id: 1,
            backgroundColor: '#78AEFF',
            title: 'Nhân viên',
            numberStatistic: 50,
            icon: <MaterialCommunityIcons name="account-group" size={24} color="black" />,
        },
        {
            id: 2,
            backgroundColor: '#FD767E',
            title: 'Hóa đơn',
            numberStatistic: 50,
            icon: <FontAwesome5 name="file-invoice" size={24} color="black" />,
        },
        {
            id: 3,
            backgroundColor: '#58DB4D',
            title: 'Hóa đơn tuần',
            numberStatistic: 50,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
        {
            id: 4,
            backgroundColor: '#EAEC73',
            title: 'Hóa đơn tháng',
            numberStatistic: 50,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <View style={styles.container_top_btn}>
                    <Entypo name="menu" size={38} color="black" />
                </View>
                <View style={styles.container_top_statistic}>
                    <FlatList
                        data={item}
                        numColumns={2} // Use a number instead of a string
                        renderItem={({ item }) => (
                            <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
                                <View style={styles.items}>
                                    {item.icon}
                                    <Text>{item.numberStatistic}</Text>
                                    <Text>{item.title}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatListContent}
                        style={styles.flatList}
                    />
                </View>
            </View>
            <View style={styles.container_center}>
                <View style={styles.container_center1}>
                    <View style={styles.center_left}>
                        <Text style={styles.text}>Generality</Text>
                        <Text style={{ marginVertical: 10, fontSize: 18 }}>September 2023</Text>
                    </View>
                    <View style={styles.center_right}>
                        <View style={styles.center_right1}>
                            <Button text="Day" customStylesBtn={styles.btn} customStylesText={styles.btnText} />
                            <Button text="Month" customStylesBtn={styles.btn} customStylesText={styles.btnText} />
                            <Button text="Year" customStylesBtn={[styles.btn]} customStylesText={styles.btnText} />
                        </View>
                        <AntDesign
                            name="clouddownloado"
                            size={24}
                            color="black"
                            style={{ backgroundColor: '#35B0E5', borderRadius: 20, paddingHorizontal: 4 }}
                        />
                    </View>
                </View>
                <View style={styles.container_center2}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    container_top: {
        flex: 1.2,
        marginTop: 40,
    },
    container_top_btn: {},
    container_center: {
        flex: 2,
        // backgroundColor: '',
        marginHorizontal: 10,
    },
    container_top_statistic: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    flatListContent: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: 'red',
    },
    flatListContent: {
        paddingHorizontal: 16,
    },
    itemContainer: {
        flex: 1,
        width: '40%',
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 18,
        padding: 16,
        // backgroundColor: backgrounHander,
        borderRadius: 8,
    },

    items: {
        alignItems: 'center',
    },
    container_center1: {
        flexDirection: 'row',
        // flex:1
    },
    center_left: {
        flex: 1.5,
        // marginTop: 10,
        // backgroundColor: 'red',
    },
    text: {
        fontSize: 18,
    },
    center_right: {
        alignItems: 'flex-end',
    },
    center_right1: {
        marginTop: 60,
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: 0,
        textAlign: 'left',
        flexDirection: 'row',
    },
    btn: {
        width: 60,
        height: 30,
        borderRadius: 0,
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderColor: '#A99898',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 5,
    },
    btnText: {
        fontSize: 14,
        fontWeight: 300,
        color: 'black',
        // textAlign: 'center',
        // alignItems: 'center',
    },
});
