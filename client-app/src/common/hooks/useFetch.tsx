import React, { useEffect, useCallback, useState } from 'react';

interface IResponse {
	data: any;
	isLoading: boolean;
	error: any;
}

interface IData {
	data: any;
	message: string;
	success: boolean;
}

export const useFetch = (param: string): IResponse => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = React.useState<IData | null>(null);

	const fetchData = useCallback(async (url: string) => {
		setIsLoading(true);
		setError(null);
		setData(null);
		try {
			const response = await fetch(url);
			const json = await response.json();
			setData(json);
		} catch (error: any) {
			setError(error);
			throw new Error(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchData(param);
	}, [fetchData, param]);

	return {
		isLoading,
		error,
		data,
	};
};
