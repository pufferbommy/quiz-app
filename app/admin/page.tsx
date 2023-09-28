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
    const response = await fetch(`/api/v1/admin/${category}s/${subCategory}`);
    const result: StatusMessageDataResponse<AdminQuestionsData> = await response.json();
    setQuestions(result.data.questions);
  }, [category, subCategory]);

  const deleteQuestion = async (questionId: number) => {
    const response = await fetch(`/api/v1/admin/${category}s?questionId=${questionId}`, {
      method: 'DELETE',
    });
    const result: StatusMessageResponse = await response.json();
    toast({
      title: result.status,
      description: result.message,
      variant: result.status === 'success' ? 'default' : 'destructive',
    });
    fetchQuestions();
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
      <div className="mb-4 flex items-end gap-8 justify-between">
        <div className="flex gap-8">
          <div className="flex gap-2 items-center">
            <h3>หมวดหลัก</h3>
            <Button
              variant={category === 'verse' ? 'default' : 'outline'}
              onClick={() => setCategory('verse')}
              size="sm"
            >
              กลอน
            </Button>
            <Button
              variant={category === 'image' ? 'default' : 'outline'}
              onClick={() => setCategory('image')}
              size="sm"
            >
              รูป
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <h3>หมวดย่อย</h3>
            <Button
              variant={subCategory === 'health' ? 'default' : 'outline'}
              onClick={() => setSubCategory('health')}
              size="sm"
            >
              สุขภาพ
            </Button>
            <Button
              variant={subCategory === 'general' ? 'default' : 'outline'}
              onClick={() => setSubCategory('general')}
              size="sm"
            >
              ทั่วไป
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <CreateQuestionDialog />
        </div>
      </div>
      <DataTable columns={columns} data={questions} />
    </AdminContext.Provider>
  );
};

export default withAdminAuth(Admin);
