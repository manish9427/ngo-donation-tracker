import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const db = await connectToDatabase();
    const collection = db.collection('donations');
    const donation: Donation = req.body;
    await collection.insertOne(donation);
    res.status(201).json({ message: 'Donation added' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}