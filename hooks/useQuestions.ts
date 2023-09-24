import { Question, StatusMessageDataResponse } from '@/lib/types';
import { useEffect, useState } from 'react';

const useQuestions = (url: string) => {
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
      const response = await fetch(url);
      const result: StatusMessageDataResponse<{ questions: Question[] }> = await response.json();
      setQuestions(result.data.questions);
      shuffleQuestions();
    };
    fetchQuestions();
  }, [url]);

  return { questions, shuffleQuestions };
};

export default useQuestions;
