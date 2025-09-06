export const validationImageUrl = (url) => {
  const pattern = /^https?:\/\/.+$/i;
  if (!url) return "";
  return !pattern.test(url) ? "Enter a valid URL/Link :)" : "";
};
