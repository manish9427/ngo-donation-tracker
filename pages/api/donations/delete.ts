import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Donation ID is required' });
  }


  id = id.toString();
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid donation ID format' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('donations');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    if (error instanceof Error && error.name === 'BSONError') {
      return res.status(400).json({ message: 'Invalid donation ID format' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}