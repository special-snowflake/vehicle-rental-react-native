export const customToast = (ToastAndroid, msg, x = 25, y = 50) => {
  return ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
    x,
    y,
  );
};
