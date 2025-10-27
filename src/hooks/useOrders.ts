// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/ordersApi';
// import { Order } from '../types/order';

// export const useOrders = () => {
//   const queryClient = useQueryClient();

//   const { data: orders, isLoading } = useQuery({
//     queryKey: ['orders'],
//     queryFn: getOrders,
//   });

//   const createMutation = useMutation({
//     mutationFn: createOrder,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, order }: { id: string; order: Partial<Order> }) => updateOrder(id, order),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteOrder,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
//   });

//   return { orders, isLoading, createMutation, updateMutation, deleteMutation };
// };
