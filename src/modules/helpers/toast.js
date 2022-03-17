export const customToast = (ToastAndroid, msg, x = 50, y = 50) => {
  return ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    x,
    y,
  );
};
