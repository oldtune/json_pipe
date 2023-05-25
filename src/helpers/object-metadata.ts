export const getMetaData = (something: any) => {
    if (!something) {
        return "";
    }

    if (Array.isArray(something)) {
        return `[] - ${something.length} items`;
    }

    return (typeof something) as string;
};