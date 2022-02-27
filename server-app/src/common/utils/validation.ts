export const isRealString = (str: string): boolean => {
	return typeof str === 'string' && str.trim().length > 0;
};
