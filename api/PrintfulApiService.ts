// api/printful/products.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const printfulApiKey = 'YdqvnDu24hXQe5aHvp14e20TgSkcO4DkLVjN6AaM'; // replace with your actual Printful API key

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const { data } = await axios.get(
      'https://unfashioned.vercel.app/api/printful ',  // Replace this mock endpoint with your actual endpoint
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${printfulApiKey}`,
        },
      },
    );

    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}
