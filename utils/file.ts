export const getFileName = (url: string) => {
  const parsedUrl = new URL(url.replaceAll("%2F", "/"));

  const name = parsedUrl.pathname.split("/").pop();

  return name!.replace(/^\d+-/, "").replaceAll("%20", " ");
};
