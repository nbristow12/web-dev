'use client';

import { useState } from 'react';
import UserRegistrationForm from '@/components/UserRegistrationForm';
import UsersList from '@/components/UsersList';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 flex items-center justify-center p-5">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <UserRegistrationForm onUserCreated={handleUserCreated} />
        <UsersList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
