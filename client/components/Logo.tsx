import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const logo:any = () => (
  <Text style={styles.header}>Alarmade - Live Safe</Text>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 30
  }
});

export default logo;
