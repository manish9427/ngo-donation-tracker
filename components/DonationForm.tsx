import { useState } from 'react';

interface DonationFormProps {
  onDonationAdded: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onDonationAdded }) => {
  const [donorName, setDonorName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState<'Pending' | 'Picked Up' | 'Delivered'>('Pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !foodType || quantity <= 0) return;
    try {
      await fetch('/api/donations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          foodType,
          quantity,
          date: new Date().toISOString().split('T')[0],
          status, 
        }),
      });
      setDonorName('');
      setFoodType('');
      setQuantity(0);
      setStatus('Pending');
      onDonationAdded();
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <input
        type="text"
        placeholder="Donor Name"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="text"
        placeholder="Food Type"
        value={foodType}
        onChange={(e) => setFoodType(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="number"
        placeholder="Quantity (kg)"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="input-field"
        min="1"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'Pending' | 'Picked Up' | 'Delivered')}
        className="input-field"
      >
        <option value="Pending">Pending</option>
        <option value="Picked Up">Picked Up</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button type="submit" className="add-button">Add Donation</button>
    </form>
  );
};

export default DonationForm;