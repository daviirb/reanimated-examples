import { StyleSheet, TextProps } from 'react-native'
import Animated from 'react-native-reanimated'


export function AnimatedThemedText({ style, children, ...props }: TextProps) {
  return (
    <Animated.Text {...props} style={[styles.text, style]}>{children}</Animated.Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'FiraCode'
  }
})