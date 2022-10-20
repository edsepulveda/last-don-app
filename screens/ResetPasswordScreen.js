import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ResetPasswordScreen</Text>
    </View>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})