import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAxiosUser = () => {
    const axiosPublic = useAxiosPublic();
    const { data: FirstData = [] , refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`)
            return res.data;
        }
    })
    return [FirstData,refetch]
};

export default useAxiosUser;