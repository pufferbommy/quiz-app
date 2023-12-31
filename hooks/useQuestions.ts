import { useCallback, useEffect, useState } from 'react';

import { Question, QuestionsData, StatusMessageDataResponse } from '@/lib/types';

const useQuestions = (url: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const shuffleQuestions = useCallback(() => {
    setQuestions(questions => {
      const newQuestions = [...questions];
      for (let i = newQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
      }
      return newQuestions;
    });
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(url);
      const result: StatusMessageDataResponse<QuestionsData> = await response.json();
      setQuestions(result.data.questions);
      setIsLoading(false);
      shuffleQuestions();
    };
    fetchQuestions();
  }, [url, shuffleQuestions]);

  return { questions, isLoading, shuffleQuestions };
};

export default useQuestions;
