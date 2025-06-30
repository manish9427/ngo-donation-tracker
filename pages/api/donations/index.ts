import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('donations');

  if (req.method === 'GET') {
    const { q, status } = req.query;
    let query: any = {};
    if (q) {
      query.$or = [
        { donorName: new RegExp(q as string, 'i') },
        { foodType: new RegExp(q as string, 'i') },
      ];
    }
    if (status) {
      query.status = status as string;
    }
    const donations = await collection.find(query).sort({ date: -1 }).toArray();
    res.status(200).json(donations);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}