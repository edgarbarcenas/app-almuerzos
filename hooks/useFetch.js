import React, { useState, useEffect } from 'react';

const useFetch = ( url ) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch( url );
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return { loading, data }
}

export default useFetch;