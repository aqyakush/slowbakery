// src/Protected.tsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TokenContext } from '../Authentication/TokenContext';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
}

const Protected: React.FC<ProtectedProps> = () => {
  const [data, setData] = useState<any>(null);
  const { token, logout: handleLogout } = useContext(TokenContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/protected/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        navigate('/login');
      }
    }

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Protected Data</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Protected;