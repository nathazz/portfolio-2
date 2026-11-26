export const hostname = (uri: string) => new URL(uri).hostname.replace(/^www\./, '');
