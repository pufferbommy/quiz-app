import { Question } from '@/lib/types';
import { useEffect, useState } from 'react';

const useQuestions = (category: string, sub: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const shuffleQuestions = () => {
    setQuestions(questions => {
      const newQuestions = [...questions];
      for (let i = newQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
      }
      return newQuestions;
    });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = `/api/v1/jokes/${category}s/${sub}`;
      const response = await fetch(url);
      const data = await response.json();
      const questions: Question[] = data.mockData;
      setQuestions(questions);
      shuffleQuestions();
    };
    fetchQuestions();
  }, [category, sub]);

  return { questions, shuffleQuestions };
};

export default useQuestions;
