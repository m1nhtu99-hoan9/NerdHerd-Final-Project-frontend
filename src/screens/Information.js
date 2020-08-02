
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const InformationScr = () => {
return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thong tin</Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.name}>NGO TAI PHAT</Text>
        <Text style={styles.infoText}>Ngan hang: Techcombank</Text>
        <Text style={styles.infoText}>Tinh trang: Binh thuong</Text>
        <Text style={styles.infoText}>Email: phatxxxxx@gmail.com</Text>
        <Text style={styles.infoText}>So dien thoai: 094345xxx</Text>
      </View>
      <Line></Line>
      <View style={styles.button}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text>Dang xuat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changePasswordButton}>
          <Text>Doi mat khau</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default InformationScr;

const Line = () => {
  return (
    <View style={styles.line}></View>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    borderRadius: 100,
    width: 65 + '%',
    alignSelf: "center",
    backgroundColor: '#e6e6e6'
  },
  container: {
    flex: 1,
    width: 94 + '%',
    alignSelf: "center"
  },
  header: {
    flex: 0.1,
    backgroundColor: 'lightpink',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  headerText: {
    fontSize : 28,
    fontWeight: "600"
  },
  information: {
    flex: 0.4,
    justifyContent: 'space-around'
  },

  button: {
    flex: 0.5,
  },

  name: {
    fontSize: 20
  },
  infoText: {
    fontSize: 17,
  },

  logoutButton: {
    borderWidth: 2,
    width: 80 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: "center",
    marginVertical: 30,
    alignSelf: "center",
    borderRadius: 7
  },
  changePasswordButton: {
    borderWidth: 2,
    width: 80 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7
  }


});