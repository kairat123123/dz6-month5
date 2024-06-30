import React, { useState, useEffect } from 'react';

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: Data = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="App">
      <Card data={data} />
    </div>
  );
};

interface CardProps {
  data: Data;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card">
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Отображение JSON данных */}
    </div>
  );
};

export default App;
