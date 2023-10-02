import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { deleteInvoiceById, getAllInvoice } from '../Service/api';
import { exportExcel } from '../utilies/export';

export default function Company() {
    const [item, setItem] = useState(false);
    const [open, setOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        const invoices = async () => {
            try {
                const data = await getAllInvoice();
                setInvoices(data);
            } catch (error) {
                console.log(error);
            }
        };
        invoices();
    }, []);
    const handleExportExcel = async () => await exportExcel(invoices, 'Invoices');
    const handleDelete = async (id) => {
        try {
            await deleteInvoiceById(id.id);
        } catch (error) {
            console.log(error.response);
        }
    };
    const ActionButton = (id) => (
        <View style={styles.action}>
            <TouchableOpacity onPress={() => handleDelete(id)}>
                <AntDesign name="delete" size={17} color="orange" />
            </TouchableOpacity>
        </View>
    );
    const headers = ['STT', 'Company', 'Customer', ''];

    const data = () =>
        invoices.map((invoice) => [
            invoice.id,
            invoice.companyName,
            invoice.emailUser,
            <ActionButton id={invoice.id} />,
        ]);

    return (
        <View style={styles.container}>
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
            />
            <ScrollView style={{ marginHorizontal: 10 }}>
                <View style={styles.container_top}>
                    <View style={styles.btns}>
                        <Button
                            text="Create new invoice"
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
