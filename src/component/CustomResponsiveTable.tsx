import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

interface Props {
    tableHead: string[];
    tableData: string[][];
}

const CustomResponsiveTable: React.FC<Props> = ({ tableHead, tableData }) => {
    const headBoxCount = tableHead.length;
    const headBoxWidth = 100 / headBoxCount;

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrolls} horizontal={true}>
            <View style={styles.container}>
                <View style={styles.head}>
                    {tableHead.map((headItem, index) => (
                        <View key={index} style={[styles.headBox, { width: `${headBoxWidth}%` }]}>
                            <Text style={styles.headBoxFont}>{headItem}</Text>
                        </View>
                    ))}
                </View>
                {tableData.length > 0
                    ? tableData.map((rowItem, indexa) => (
                        <View key={indexa} style={styles.row}>
                            {rowItem.map((single: any, sindex: any) => (
                                <View key={sindex} style={[styles.rowBox, { width: `${headBoxWidth}%` }]}>
                                    <Text>{single}</Text>
                                </View>
                            ))}
                        </View>
                    ))
                    : null}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    scrolls: {
       
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowBox: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 70
    },
    headBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headBoxFont: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default CustomResponsiveTable;
