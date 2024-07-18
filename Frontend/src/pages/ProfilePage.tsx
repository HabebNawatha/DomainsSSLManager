import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {JwtPayload} from '../models/User';

export default function ProfilePage() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // Decode the token to get user information
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <strong>ID:</strong> {user.userId}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      
    </div>
  );
}
