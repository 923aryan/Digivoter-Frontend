import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
export default function SuccessfullyEnrolled() {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-done-circle-outline" style={styles.icon} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: 250,
    color: '#73FF41'
  }
})
