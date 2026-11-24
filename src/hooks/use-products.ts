import { useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchProductsCatalog } from '../services/product-service';

export function useProductsCatalog() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsCatalog,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductDetail(productId: string | undefined) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId!),
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
