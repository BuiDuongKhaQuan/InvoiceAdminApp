import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { AntDesign, Feather, Ionicons, Foundation, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { getAllUser, getUserByEmail, getUserByStatus } from '../Service/api';
import { exportExcel } from '../utilies/export';
import Popup from '../components/Popup';
import Loading from '../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';
export default function Company() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [dataPopup, setDataPopup] = useState();
    const [visible, setVisible] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [emailSearch, setEmailSearch] = useState('');
    const type = [t('common:notActivated'), t('common:active'), t('common:delete'), t('common:lock'), t('common:all')];
    useEffect(() => {
        const customers = async () => {
            setLoading(true);
            try {
                const data = await getAllUser();
                setCustomers(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        customers();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await getUserByEmail(emailSearch);
            const data = response;
            setCustomers(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleFilter = async (status) => {
        setLoading(true);
        try {
            if (status === 4) {
                const response = await getAllUser();
                const data = response;
                setCustomers(data);
            } else {
                const response = await getUserByStatus(status);
                const data = response;
                setCustomers(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleExportExcel = async () => await exportExcel(customers, 'Customer');

    const ActionButton = ({ data }) => (
        <TouchableOpacity
            onPress={() => {
                setDataPopup(data);
                setVisible(true);
            }}
            style={styles.action}
        >
            <Foundation name="indent-more" size={24} color="green" />
        </TouchableOpacity>
    );

    const StatusView = ({ data }) => {
        let icon;
        if (data.status === 0) {
            icon = <FontAwesome5 name="user-plus" size={17} color="#4285f4" />;
        }
        if (data.status === 1) {
            icon = <FontAwesome5 name="user-check" size={17} color="green" />;
        }
        if (data.status === 2) {
            icon = <FontAwesome5 name="user-times" size={17} color="red" />;
        }
        if (data.status === 3) {
            icon = <FontAwesome5 name="user-lock" size={17} color="black" />;
        }
        return <View style={styles.action}>{icon}</View>;
    };
    const data = () =>
        customers.map((customer) => [
            customer.id,
            customer.name,
            customer.email,
            <StatusView data={customer} />,
            <ActionButton data={customer} />,
        ]);
    const headers = [t('common:no'), t('common:fullName'), 'Email', t('common:status'), ''];

    return (
        <View style={styles.container}>
            <Loading loading={loading} />
            {dataPopup && <Popup visible={visible} onClose={() => setVisible(false)} data={dataPopup} />}
            <Input
                holder={t('common:search tìm kiếm theo email')}
                iconLeft={<Feather name="search" size={21} color="black" />}
                iconRight={<Ionicons name="ios-qr-code-outline" size={21} color="black" />}
                customStylesContainer={{
                    borderRadius: 0,
                    height: 50,
                    width: '100%',
                    marginHorizontal: 0,
                }}
                customStylesInput={{
                    fontSize: 12,
                    marginLeft: 10,
                }}
                value={emailSearch}
                onChangeText={(name) => setEmailSearch(name)}
                onSubmitEditing={handleSearch}
            />
            <ScrollView style={{ marginHorizontal: 10 }}>
                <View style={styles.container_top}>
                    <View style={styles.btns}>
                        <Button
                            onPress={handleExportExcel}
                            text={t('common:exportExcel')}
                            iconLeft={<AntDesign name="export" size={17} color="black" />}
                            customStylesBtn={{
                                width: '30%',
                                height: '100%',
                                marginVertical: 5,
                                backgroundColor: '#00ffed',
                                borderRadius: 4,
                            }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                        <View
                            style={{
                                width: '40%',
                            }}
                        >
                            <SelectDropdown
                                data={type}
                                onSelect={(selectedItem, index) => {
                                    handleFilter(index);
                                }}
                                buttonStyle={styles.dropdown_btn}
                                defaultButtonText={t('common:select')}
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
                <View style={styles.container_center}>
                    <View style={styles.center_bottom}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row
                                data={headers}
                                style={{
                                    backgroundColor: 'lightgray',
                                }}
                                height={25}
                                flexArr={[0.45, 2, 2, 0.6, 0.4]}
                                textStyle={styles.tableheader}
                            />
                            <TableWrapper>
                                <Rows
                                    data={data()}
                                    flexArr={[0.45, 2, 2, 0.6, 0.4]}
                                    heightArr={25}
                                    textStyle={styles.tableheader}
                                />
                            </TableWrapper>
                        </Table>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    action: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    container_top: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 10,
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
    },

    btnText: {
        fontSize: 14,
        color: 'black',
        marginRight: 5,
    },
    icon_btn: {
        marginHorizontal: 5,
    },
    container_center: {
        flex: 8,
        flexDirection: 'colum',
    },

    center_bottom: {
        flex: 6,
    },

    tableheader: {
        textAlign: 'center',
    },

    dropdown_btn: {
        height: 30,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'aqua',
    },
});
