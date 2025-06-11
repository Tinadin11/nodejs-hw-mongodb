const parseIsFavourite = (isFavourite) => {
    const isString = typeof isFavourite === 'string';
    if (!isString) return;
    if (isFavourite.toLowerCase() === 'true') return true;
    if (isFavourite.toLowerCase() === 'false') return false;

    return;
};
const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (type) => ['work', 'home', 'personal'].includes(contactType);
    if (isContactType(contactType)) return contactType;

};

export const parseFilterParams = (query) => {
    const { isFavourite, contactType } = query;
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    const parsedContactType = parseContactType(contactType);

    return {
        isFavourite: parsedIsFavourite,
        contactType: parsedContactType,
    };
};