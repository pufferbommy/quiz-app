import { createContext } from 'react';

const AdminContext = createContext<{
  deleteQuestion: (questionId: number) => Promise<void>;
  fetchQuestions: () => Promise<void>;
}>({
  deleteQuestion: async () => {},
  fetchQuestions: async () => {},
});

interface AdminProviderProps {
  value: {
    deleteQuestion: (questionId: number) => Promise<void>;
    fetchQuestions: () => Promise<void>;
  };
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ value, children }) => {
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContext;
