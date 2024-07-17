import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface FetchDataResult<T> {
    fetchedData: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (url: string) => Promise<void>;
}

const useFetchData = <T>(): FetchDataResult<T> => {
    const [fetchedData, setFetchedData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url: string) => {
        setLoading(true);
        try {
            const response: AxiosResponse<T> = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setFetchedData(response.data);
            console.log("response.data:",response.data)
            console.log("fetchedData after update:", fetchedData);
            setError(null);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
            
        }
    };

    return { fetchedData, loading, error, fetchData };
};

export default useFetchData;
