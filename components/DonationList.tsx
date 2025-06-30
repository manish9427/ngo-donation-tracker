import { useState, useEffect } from 'react';
import { Donation } from '../types';

interface DonationListProps {
  initialDonations: Donation[];
  filterStatus: string;
}

const DonationList: React.FC<DonationListProps> = ({ initialDonations, filterStatus }) => {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const url = new URL('http://localhost:3000/api/donations');
        if (searchTerm) url.searchParams.append('q', searchTerm);
        if (filterStatus) url.searchParams.append('status', filterStatus);
        const res = await fetch(url.toString());
        const data = await res.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, [searchTerm, filterStatus]);

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('Invalid donation ID:', id);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/donations/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (response.ok) {
        setDonations(donations.filter((donation) => donation._id !== id));
      } else {
        console.error('Delete failed:', result.message);
      }
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  return (
    <div className="donation-list">
      <input
        type="text"
        placeholder="Search donations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="donation-table">
        <thead>
          <tr>
            <th>Donor</th>
            <th>Food Type</th>
            <th>Quantity (kg)</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.donorName}</td>
              <td>{donation.foodType}</td>
              <td>{donation.quantity}</td>
              <td>{donation.date}</td>
              <td>{donation.status}</td>
              <td>
                <button
                  onClick={() => handleDelete(donation._id!)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;