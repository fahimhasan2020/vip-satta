import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  tableHead: string[];
  tableData: string[];
}

const CustomTable: React.FC<Props> = ({ tableHead,tableData }) => {
  const headBoxCount = tableHead.length;
  const headBoxWidth = `${100 / headBoxCount}%`;

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        {tableHead.map((headItem, index) => (
          <View key={index} style={[styles.headBox, { width: headBoxWidth }]}>
            <Text style={styles.headBoxFont}>{headItem}</Text>
          </View>
        ))}
      </View>
      {tableData.length>0?tableData.map((rowItem,indexa)=>(<View key={indexa} style={styles.row}>
        {rowItem.map((single:any,sindex:any)=>(<View key={sindex} style={[styles.rowBox, { width: headBoxWidth }]}><Text>{single}</Text></View>))}</View>)):null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  row:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBox:{
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
    borderWidth:1,
    borderColor:'#ccc'
  },
  headBox: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headBoxFont:{
    fontSize:10,
    fontWeight:'bold'
  }
});

export default CustomTable;
