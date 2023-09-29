'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

import {
  AdminQuestion,
  AdminQuestionsData,
  StatusMessageResponse,
  StatusMessageDataResponse,
} from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import withAdminAuth from '@/components/wrapper/withAdminAuth';
import CreateQuestionDialog from '@/components/dialog/CreateQuestionDialog';

export const AdminContext = createContext<{
  deleteQuestion: (questionId: number) => Promise<void>;
  fetchQuestions: () => Promise<void>;
}>({
  deleteQuestion: async () => {},
  fetchQuestions: async () => {},
});

const Admin = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState<'verse' | 'image'>('verse');
  const [subCategory, setSubCategory] = useState<'health' | 'general'>('health');
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(`/api/v1/admin/${category}s/${subCategory}`);
      if (!response.ok) throw new Error('Failed to fetch questions');

      const result: StatusMessageDataResponse<AdminQuestionsData> = await response.json();
      setQuestions(result.data.questions);
    } catch (error) {
      const errorMessage = (error as Error).message || 'An error occurred.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [category, subCategory, toast]);

  const deleteQuestion = async (questionId: number) => {
    try {
      const response = await fetch(`/api/v1/admin/${category}s?questionId=${questionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete question');

      const result: StatusMessageResponse = await response.json();
      toast({
        title: result.status,
        description: result.message,
      });

      fetchQuestions();
    } catch (error) {
      const errorMessage = (error as Error).message || 'An error occurred.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'default',
      });
    }
  };

  const renderCategoryButton = (value: 'verse' | 'image', label: string) => {
    return (
      <Button
        variant={category === value ? 'default' : 'outline'}
        onClick={() => setCategory(value)}
        size="sm"
      >
        {label}
      </Button>
    );
  };

  const renderSubCategoryButton = (value: 'health' | 'general', label: string) => {
    return (
      <Button
        variant={subCategory === value ? 'default' : 'outline'}
        onClick={() => setSubCategory(value)}
        size="sm"
      >
        {label}
      </Button>
    );
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <AdminContext.Provider
      value={{
        deleteQuestion,
        fetchQuestions,
      }}
    >
      <Title>แอดมิน</Title>
      <div className="mb-4 flex gap-8 flex-col md:flex-row items-center md:justify-between">
        <div className="flex flex-wrap justify-center md:justify-between gap-8">
          <div className="flex gap-2 items-center">
            <h3>หมวดหลัก</h3>
            {renderCategoryButton('verse', 'กลอน')}
            {renderCategoryButton('image', 'รูป')}
          </div>
          <div className="flex gap-2 items-center">
            <h3>หมวดย่อย</h3>
            {renderSubCategoryButton('health', 'สุขภาพ')}
            {renderSubCategoryButton('general', 'ทั่วไป')}
          </div>
        </div>
        <CreateQuestionDialog />
      </div>
      <DataTable columns={columns} data={questions} />
    </AdminContext.Provider>
  );
};

export default withAdminAuth(Admin);
