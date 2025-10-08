'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { User } from '@/types/user';

interface UsersListProps {
  refreshTrigger: number;
}

export default function UsersList({ refreshTrigger }: UsersListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await apiClient.getUsers();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Registered Users</h3>
        <button
          onClick={loadUsers}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="text-center text-gray-600 italic py-8">
            Loading users...
          </div>
        )}

        {error && (
          <div className="text-center text-gray-600 italic py-8">
            {error}
          </div>
        )}

        {!isLoading && !error && users.length === 0 && (
          <div className="text-center text-gray-600 italic py-8">
            No users registered yet.
          </div>
        )}

        {!isLoading && !error && users.length > 0 && (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {user.name}
                </h4>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Birthday:</strong> {formatDate(user.birthday)}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Registered:</strong> {formatDate(user.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}