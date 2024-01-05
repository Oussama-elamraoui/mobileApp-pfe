import React from 'react'
import { useColorScheme,ImageBackground, StyleSheet, KeyboardAvoidingView,View } from 'react-native'
import { theme } from '../core/theme'

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
export default function Background({ children }) {
  const scheme = useColorScheme(); 
  return (
    <View style={styles.background}>
 
    {/* <ImageBackground
    source={require('../assets/logo_ai.png')}
      resizeMode="repeat"
      style={styles.background}
    > */}
      <KeyboardAvoidingView  independent={true} style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    {/* </ImageBackground> */}

    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})