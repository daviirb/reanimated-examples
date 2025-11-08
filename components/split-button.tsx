import { Palette } from '@/constants'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AnimatedThemedText } from './base'

type SplitAction = {
  label: string
  onPress: () => void
  backgroundColor: string
}

type SplitButtonProps = {
  splitted: boolean
  mainAction: SplitAction
  leftAction: SplitAction
  rightAction: SplitAction
}
const ButtonHeight = 60
const paddingHorizontal = 20
const gap = 10
export function SplitButton({ mainAction, leftAction, rightAction, splitted }: SplitButtonProps) {

  const { width: windowWidth } = useWindowDimensions()

  const SplittedButtonWidth = (windowWidth - paddingHorizontal * 2 - gap) / 2

  const rLeftButtonStyle = useAnimatedStyle(() => {
    const leftButtonWidth = splitted ? SplittedButtonWidth : 0

    return {
      width: withTiming(leftButtonWidth),
      opacity: withTiming(splitted ? 1 : 0)

    }
  }, [splitted])

  const rLeftTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 1 : 0, {
        duration: 150
      })
    }
  }, [splitted])

  const rMainButtonStyle = useAnimatedStyle(() => {
    const mainButtonWidth = splitted
      ? SplittedButtonWidth
      : SplittedButtonWidth * 2

    return {
      width: withTiming(mainButtonWidth),
      marginLeft: withTiming(splitted ? gap : 0),
      backgroundColor: withTiming(splitted ? rightAction.backgroundColor : mainAction.backgroundColor),
    }
  }, [splitted])

  const rMainTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 0 : 1)
    }
  }, [splitted])

  const rRightTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 1 : 0)
    }
  }, [splitted])

  return (
    <View style={styles.container}>
      <Animated.View
        onTouchEnd={leftAction.onPress}
        style={
          [
            styles.button,
            rLeftButtonStyle,
            {
              backgroundColor: leftAction.backgroundColor,
            },

          ]
        }>
        <AnimatedThemedText numberOfLines={1} style={[styles.label, rLeftTextStyle]}>
          {leftAction.label}
        </AnimatedThemedText>
      </Animated.View>

      <Animated.View
        onTouchEnd={splitted ? rightAction.onPress : mainAction.onPress}
        style={
          [
            styles.button,
            rMainButtonStyle,
          ]
        }>
        <AnimatedThemedText style={[styles.label, rMainTextStyle]}>
          {mainAction.label}
        </AnimatedThemedText>
        <AnimatedThemedText style={[styles.label, rRightTextStyle]}>
          {rightAction.label}
        </AnimatedThemedText>
      </Animated.View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    height: ButtonHeight,
    paddingHorizontal,
    flexDirection: 'row',
  },
  button: {
    height: ButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderCurve: 'continuous',
  },
  label: {
    color: Palette.text,
    fontSize: 16,
    position: 'absolute'
  }
})