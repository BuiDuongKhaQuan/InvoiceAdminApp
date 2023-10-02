import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { getAllCompanies, getCompaniesByName } from '../Service/api';
import { exportExcel } from '../utilies/export';
import Popup from '../components/Popup/company';

export default function Company() {
    const [dataPopup, setDataPopup] = useState();
    const [visible, setVisible] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [companys, setCompanys] = useState([]);

    useEffect(() => {
        const companys = async () => {
            try {
                const data = await getAllCompanies();
                setCompanys(data);
            } catch (error) {
                console.log(error);
            }
        };
        companys();
    }, []);
    const handleExportExcel = async () => await exportExcel(companys, 'Company');
    const handleSearch = async () => {
        try {
            const response = await getCompaniesByName(nameSearch);
            const data = response;
            setCompanys(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCreate = () => {
        setVisible(true);
    };
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
    const headers = ['STT', 'Company', 'Phone', ''];
    const data = () =>
        companys.map((company) => [company.id, company.name, company.phone, <ActionButton data={company} />]);

    return (
        <View style={styles.container}>
            {dataPopup && <Popup visible={visible} onClose={() => setVisible(false)} data={dataPopup} />}
            <Popup visible={visible} onClose={() => setVisible(false)} create />
            <Input
                holder="Search by business name, email...."
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
                value={nameSearch}
                onChangeText={(name) => setNameSearch(name)}
                onSubmitEditing={handleSearch}
            />
            <ScrollView style={{ marginHorizontal: 10 }}>
                <View style={styles.container_top}>
                    <View style={styles.btns}>
                        <Button
                            text="Create new company"
                            onPress={handleCreate}
                            iconLeft={<AntDesign name="plus" size={17} color="black" />}
                            customStylesBtn={{ ...styles.btn, flex: 1.4, backgroundColor: '#59f759' }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                        <Button
                            text="Delete history"
                            iconLeft={<Feather name="delete" size={17} color="black" />}
                            customStylesBtn={{ ...styles.btn, flex: 1.1, backgroundColor: 'red' }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                        <Button
                            text="Edit"
                            iconLeft={<Feather name="edit-2" size={17} color="black" />}
                            customStylesBtn={{ ...styles.btn, flex: 0.5, backgroundColo7r: '#FD767E' }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                    </View>
                    <View style={styles.btns}>
                        <Button
                            onPress={handleExportExcel}
                            text="Export Excel"
                            iconLeft={<AntDesign name="export" size={17} color="black" />}
                            customStylesBtn={{ ...styles.btn, backgroundColor: '#00ffed' }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                        <Button
                            text="Export PDF"
                            iconLeft={<MaterialCommunityIcons name="export" size={17} color="black" />}
                            customStylesBtn={{ ...styles.btn, backgroundColor: '#04c904' }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                        <Button
                            text="Download"
                            iconLeft={<AntDesign name="download" size={17} color="black" />}
                            customStylesBtn={{ ...styles.btn, backgroundColor: 'yellow' }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
                    </View>
                    <View style={styles.btns}>
                        <Button
                            text="Print"
                            iconLeft={<AntDesign name="printer" size={17} color="black" />}
                            customStylesBtn={{
                                width: '20%',
                                height: '100%',
                                marginVertical: 5,
                                backgroundColor: '#00ffed',
                                borderRadius: 4,
                            }}
                            customStylesText={styles.btnText}
                            customStylesIcon={styles.icon_btn}
                        />
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
                                flexArr={[0.5, 2, 2, 0.45]}
                                textStyle={styles.tableheader}
                            />
                            <TableWrapper>
                                <Rows
                                    data={data()}
                                    flexArr={[0.5, 2, 2, 0.45]}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 7,
    },
    btn: {
        marginRight: 5,
        height: '100%',
        flex: 1,
        borderRadius: 4,
        marginVertical: 4,
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
    center_top: {
        flex: 1,
        flexDirection: 'row',
    },
    center_drop: {
        flex: 1.4,
        marginLeft: 10,
    },
    center_input: {
        flex: 3,
        marginHorizontal: 10,
    },
    input: {
        marginVertical: 0,
        height: '50%',
        width: '97%',
        justifyContent: 'center',
    },
    input_text: {
        height: '100%',
        marginVertical: 0,
        marginHorizontal: 15,
    },
    center_bottom: {
        flex: 6,
    },
    drop: {
        flex: 1,
        width: '100%',
    },

    tableheader: {
        textAlign: 'center',
    },
    table: {
        flex: 6,
    },
});
