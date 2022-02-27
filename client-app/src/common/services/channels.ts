export const getChannels = async () => {
	const res = await fetch(`${process.env.REACT_APP_API_URL}/api/channels`);
	return res.json();
};
