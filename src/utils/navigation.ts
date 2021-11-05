export const onScreen = (screen?: any, navigation?: any, obj?: any) => () => {
  navigation.navigate(screen, obj);
};
