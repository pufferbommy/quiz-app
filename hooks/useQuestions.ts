import { useEffect, useState } from 'react';

const useQuestions = (category: string, sub: string) => {
  const [questions, setQuestions] = useState<
    {
      imgPath: string;
      no: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = `/api/v1/joke-${category}/${sub}`;
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data.mockData);
    };
    fetchQuestions();
  }, [category, sub]);

  return questions;
};

export default useQuestions;
