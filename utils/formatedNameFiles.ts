export const formattedName = (url: string) => {
  const decodedUrl = decodeURIComponent(url);
  const startIndex = decodedUrl.lastIndexOf("/") + 1;
  const endIndex = decodedUrl.indexOf("?", startIndex);
  return endIndex === -1
    ? decodedUrl.substring(startIndex)
    : decodedUrl.substring(startIndex, endIndex);
};

export const formattedNameList = (url: string) => {
  const decodedUrl = decodeURIComponent(url);

  const startIndex = decodedUrl.lastIndexOf("/") + 1;

  const endIndex = decodedUrl.indexOf("?", startIndex);

  const fullName =
    endIndex === -1
      ? decodedUrl.substring(startIndex)
      : decodedUrl.substring(startIndex, endIndex);

  const formattedName = fullName.replace(/^\d+-/, "");
  return formattedName;
};
