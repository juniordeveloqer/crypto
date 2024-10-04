// lib/useTypedStrings.ts
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};

export const useTypedStrings = () => {
    const { data, error } = useSWR('/api/typedStrings', fetcher); // This should be '/api/typedStrings'


  return {
    strings: data || ["Loading..."], // Default strings while loading
    isLoading: !error && !data,
    isError: error,
  };
};
