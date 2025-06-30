import { useState } from 'react';
import DonationForm from '../components/DonationForm';
import DonationList from '../components/DonationList';
import FilterBar from '../components/FilterBar';
import { Donation } from '../types';

export default function Home({ initialDonations }: { initialDonations: Donation[] }) {
  const [refresh, setRefresh] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>('');

  const handleDonationAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setRefresh((prev) => prev + 1); 
  };

  return (
    <div className="app">
      <h1 className="title">Food Donation Tracker</h1>
      <div >
        {[...Array(6)].map((_, index) => (
          <div key={index} />
        ))}
      </div>
      <DonationForm onDonationAdded={handleDonationAdded} />
      <FilterBar onFilterChange={handleFilterChange} />
      <DonationList initialDonations={initialDonations} key={refresh} filterStatus={filterStatus} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/donations');
  const initialDonations = await res.json();
  return { props: { initialDonations } };
}