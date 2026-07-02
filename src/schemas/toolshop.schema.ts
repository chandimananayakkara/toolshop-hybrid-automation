import { z } from 'zod';

export const LoginResponseSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string(),
  
});


export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  is_location_offer: z.number().optional(),
  is_rental: z.number().optional(),
  in_stock: z.boolean().optional(),
  product_image: z.object({
    by_name: z.string().optional(),
    by_url: z.string().optional(),
    file_name: z.string().optional(),
    title: z.string().optional(),
  }).optional(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  }).optional(),
});

export const ProductsResponseSchema = z.object({
  current_page: z.number(),
  data: z.array(ProductSchema),
  total: z.number(),
  per_page: z.number(),
  last_page: z.number(),
});


export const CartItemSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
});

export const CartResponseSchema = z.array(CartItemSchema);


export const UserProfileSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),

  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});


export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;