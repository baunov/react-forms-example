export const insertAt = <T>(list: T[], item: T, insertIndex: number): T[] => {
    return [...list.slice(0, insertIndex), item, ...list.slice(insertIndex)];
};
