import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather, Ionicons, Foundation } from '@expo/vector-icons';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { getAllProduct, getProductByName } from '../Service/api';
import { exportExcel } from '../utilies/export';
import Button from '../components/Button';
import Input from '../components/Input';
import Popup from '../components/Popup/product';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';

export default function Company() {
    const [dataPopup, setDataPopup] = useState();
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [nameSearch, setNamSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
        const products = async () => {
            setLoading(true);
            try {
                const data = await getAllProduct();
                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        products();
    }, []);

    const handleExportExcel = async () => await exportExcel(products, 'Product');
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await getProductByName(nameSearch);
            const data = response;
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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
    const headers = [t('common:no'), t('common:name'), t('common:price'), t('common:company'), ''];
    const data = () =>
        products.map((product) => [
            product.id,
            product.name,
            product.price,
            product.nameCompany,
            <ActionButton data={product} />,
        ]);

    return (
        <View style={styles.container}>
            <Loading loading={loading} />
            {dataPopup && <Popup visible={visible} onClose={() => setVisible(false)} data={dataPopup} />}
            <Input
                holder={t('common:search')}
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
                onChangeText={(name) => setNamSearch(name)}
                onSubmitEditing={handleSearch}
            />
            <ScrollView style={{ marginHorizontal: 10 }}>
                <View style={styles.container_top}>
                    <View style={styles.btns}>
                        <Button
                            text={t('common:exportExcel')}
                            onPress={handleExportExcel}
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
                                flexArr={[0.5, 2, 2, 2, 0.5]}
                                textStyle={styles.tableheader}
                            />
                            <TableWrapper>
                                <Rows
                                    data={data()}
                                    flexArr={[0.5, 2, 2, 2, 0.5]}
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
