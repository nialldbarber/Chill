export const onScreen = (screen?: any, navigation?: any, obj?: any) => () => {
  navigation.navigate(screen, obj);
};

export const goBack = (navigation: any) => () => navigation.goBack();

export const goHome = (navigation: any) => () => navigation.popToTop()();
