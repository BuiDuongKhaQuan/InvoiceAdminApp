import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';
import { getAllCompanies1, getAllInvoice1, getAllUser1 } from '../Service/api';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';

export default function Home() {
    const { t } = useTranslation();
    const [account, setAccount] = useState(0);
    const [invoices, setINvoices] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [item, setItem] = useState([
        {
            id: 1,
            backgroundColor: '#78AEFF',
            title: t('common:account'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="account-group" size={24} color="black" />,
        },
        {
            id: 2,
            backgroundColor: '#FD767E',
            title: t('common:company'),
            numberStatistic: 0,
            icon: <FontAwesome5 name="file-invoice" size={24} color="black" />,
        },
        {
            id: 3,
            backgroundColor: '#58DB4D',
            title: t('common:invoice'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
        {
            id: 4,
            backgroundColor: '#EAEC73',
            title: t('common:invoiceMonth'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userData = await getAllUser1(10000, page);
                const company = await getAllCompanies1(10000, page);
                const invoices = await getAllInvoice1(10000, page);
                // const products = await getAllProduct1(10000, page);

                const updatedItem = item.map((statistic) => {
                    if (statistic.title === t('common:account')) {
                        return { ...statistic, numberStatistic: userData.length };
                    }
                    if (statistic.title === t('common:company')) {
                        return { ...statistic, numberStatistic: company.length };
                    }
                    if (statistic.title === t('common:invoice')) {
                        return { ...statistic, numberStatistic: invoices.length };
                    }
                    // if (statistic.title === t('common:invoiceMonth')) {
                    //     // You need to calculate the month's length based on your business logic
                    //     return { ...statistic, numberStatistic: /* calculated length */ };
                    // }

                    return statistic;
                });

                setItem(updatedItem);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [t]);
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <View style={styles.container_top_statistic}>
                    <FlatList
                        data={item}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
                                <View style={styles.items}>
                                    {item.icon}
                                    <Text>{item.numberStatistic}</Text>
                                    <Text>{item.title}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()} // Update this line
                        contentContainerStyle={styles.flatListContent}
                        style={styles.flatList}
                    />
                </View>
            </View>
            <View style={styles.container_center}>
                <View style={styles.container_center1}>
                    <View style={styles.center_left}>
                        <Text style={styles.text}>{t('common:overview')}</Text>
                        <Text style={{ marginVertical: 10, fontSize: 18 }}>1/2/2023</Text>
                    </View>
                    <View style={styles.center_right}>
                        <View style={styles.center_right1}>
                            <Button
                                text={t('common:day')}
                                customStylesBtn={styles.btn}
                                customStylesText={styles.btnText}
                            />
                            <Button
                                text={t('common:month')}
                                customStylesBtn={styles.btn}
                                customStylesText={styles.btnText}
                            />
                            <Button
                                text={t('common:year')}
                                customStylesBtn={[styles.btn]}
                                customStylesText={styles.btnText}
                            />
                        </View>
                        <AntDesign
                            name="clouddownloado"
                            size={24}
                            color="black"
                            style={{ backgroundColor: '#35B0E5', borderRadius: 20, paddingHorizontal: 4 }}
                        />
                    </View>
                </View>
                <View style={styles.container_center2}>
                    <Image
                        source={{
                            uri: 'https://news.meeycdn.net/zoom/480x0/uploads/images/2022/08/26/cach-ve-bieu-do-line-trong-excel-1-1661526357.jpg',
                        }}
                        style={{ width: '100%', height: 300 }}
                    />
                </View>
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
    },
    container_center: {
        flex: 2,
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
    container_center2: {
        // flex: 1,
        height: 1000000,
        marginTop: 20,
        // backgroundColor: 'red',
    },
    avatar: {
        backgroundColor: 'red',
        // height: '100%',
        // width: 'auto',
    },
});
