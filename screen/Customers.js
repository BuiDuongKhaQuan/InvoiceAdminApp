import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Feather, Entypo, Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import Input from '../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';

import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';

export default function Customer() {
    const [item, setItem] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ]);

    const ActionButton = () => (
        <View style={styles.actionBtn}>
            <TouchableOpacity onPress={() => alert('delete')}>
                <AntDesign name="lock" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('delete')}>
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
    const headers = ['STT', 'First and last name', 'Email', 'Function'];
    const rows = [
        ['naruto', '50', '5000', <ActionButton />],
        ['sasuke', '50', '5000', <ActionButton />],
    ];
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <View>
                    <Entypo name="menu" size={38} color="black" />
                </View>
                <Input
                    holder="Search by customer name..."
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
                    // onPressIconRight={() => navigation.navigate('Scanner')}
                    // onChangeText={(text) => setId(text)}
                />
                <View style={styles.container_top_statistic}>
                    <Button
                        style={{ backgroundColor: '#59f759', borderRadius: 5 }}
                        text="create new product"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
                    />
                    <Button
                        style={{ backgroundColor: 'yellow', borderRadius: 5 }}
                        text="Download"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
                    />
                    <Button
                        style={{ backgroundColor: '#085bd8', borderRadius: 5 }}
                        text="Delete history"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
                    />
                    <Button
                        style={{ backgroundColor: '#00ffed', borderRadius: 5 }}
                        text="Print"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
                    />
                    <Button
                        style={{ backgroundColor: '#00ffed', borderRadius: 5 }}
                        text="Export Excel"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
                    />
                    <Button
                        style={{ backgroundColor: '#04c904', borderRadius: 5 }}
                        text="Export PDF"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
                    />
                    <Button
                        style={{ backgroundColor: '#FD767E', borderRadius: 5 }}
                        text="Edit"
                        customStylesBtn={styles.btn}
                        customStylesText={styles.btnText}
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
                            height={40}
                            flexArr={[1, 2, 1, 1]}
                            textStyle={styles.tableheader}
                        />
                        <TableWrapper>
                            <Rows
                                data={rows}
                                heightArr={[40, 40, 40, 40]}
                                flexArr={[1, 2, 1, 1]}
                                textStyle={styles.tableheader}
                            />
                        </TableWrapper>
                    </Table>
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
    actionBtn: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    container_top: {
        flex: 0,
        marginTop: 40,
    },
    container_top_statistic: {
        flex: 0,
        flexWrap: 'wrap',
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    container_center: {
        flex: 1,
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
    btnText: {
        fontSize: 14,
        color: 'black',
    },
    tableheader: {
        textAlign: 'center',
    },
    table: {
        flex: 6,
    },
});
