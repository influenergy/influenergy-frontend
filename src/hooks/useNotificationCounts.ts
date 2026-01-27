// hooks/useNotificationCounts.ts
import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/services/postServices';

export const useCreatorNotificationCounts = () => {
    return useQuery({
        queryKey: ['creatorNotificationCounts'],
        queryFn: async () => {
            try {
                const response = await postApi.getCreatorNotificationCounts();
                // Extract and return just the data property
                return response.data;
            } catch (error) {
                console.error("Error fetching creator notification counts:", error);
                throw error;
            }
        },
        staleTime: 5000,
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};

export const useBrandNotificationCounts = () => {
    return useQuery({
        queryKey: ['brandNotificationCounts'],
        queryFn: async () => {
            try {
                const response = await postApi.getBrandNotificationCounts();
                return response.data;
            } catch (error) {
                console.error("Error fetching brand notification counts:", error);
                throw error;
            }
        },
        staleTime: 5000,
        refetchInterval: 30000,
    });
};