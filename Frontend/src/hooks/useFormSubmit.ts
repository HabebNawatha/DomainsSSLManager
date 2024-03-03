import { useState } from 'react';
import axios from 'axios';

const useFormSubmit = <T>(url: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const handleSubmit = async (formData: T, onSuccess: (data: T) => void) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(url, formData);
            if (response.status === 200) {
                onSuccess(response.data); // Set data on successful response
            } else {
                setError('An unexpected error occurred');
            }
            // If the request is successful, you can handle the response data here
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 409) {
                        setError('Email already exists'); // Handle 409 conflict error
                    } else {
                        setError(error.response.data.message); // Access the error message sent from the server
                    }
                } else {
                    setError('Network Error: Please check your internet connection'); // Handle network errors
                }
            } else {
                setError('An error occurred while processing your request'); // Handle unexpected errors
            }
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading, error, data, setError };
};

export default useFormSubmit;
