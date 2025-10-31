// コンソールエラーを抑制
const originalError = console.error;
console.error = (...args) => {
  // 文字列チェックをより広範に
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('non-boolean attribute') ||
      message.includes('jsx') ||
      message.includes('global'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};
