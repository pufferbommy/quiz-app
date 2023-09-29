import Image from 'next/image';
import { useContext } from 'react';
import { Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { AdminContext } from './page';
import { AdminQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import EditQuestionDialog from '@/components/dialog/EditQuestionDialog';

interface ActionsProps {
  oldCategory: string;
  questionId: number;
}

const Actions = ({ oldCategory, questionId }: ActionsProps) => {
  const { deleteQuestion } = useContext(AdminContext);

  const handleDeleteQuestionClick = async () => {
    const isConfirmed = confirm('คุณต้องการลบคำถามนี้ใช่หรือไม่');
    if (isConfirmed) deleteQuestion(questionId);
  };

  return (
    <div className="flex gap-2 justify-center">
      <EditQuestionDialog oldCategory={oldCategory} questionId={questionId} />
      <Button onClick={handleDeleteQuestionClick} variant="outline" size="icon">
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<AdminQuestion>[] = [
  {
    header: 'การจัดการ',
    cell: ({ row }) => <Actions oldCategory={row.original.category} questionId={row.original.id} />,
    size: 200,
  },
  {
    accessorKey: 'imagePath',
    header: 'รูป',
    size: 300,
    cell: ({ row }) => {
      return (
        <div className="relative rounded-md border border-input overflow-hidden aspect-video">
          <Image fill priority sizes="100%" src={row.getValue('imagePath')} alt="" />
        </div>
      );
    },
  },
  {
    accessorKey: 'answer',
    header: 'คำตอบ',
    cell: ({ row }) => {
      const answer = row.getValue('answer') as AdminQuestion['answer'];
      if (typeof answer === 'string') {
        return <p className="text-center">{answer}</p>;
      }
      const { first, second, third, fourth } = answer;
      return (
        <div className="flex justify-center items-center">
          <ul className="flex flex-col gap-2">
            <li>1. {first}</li>
            <li>2. {second}</li>
            <li>3. {third}</li>
            <li>4. {fourth}</li>
          </ul>
        </div>
      );
    },
  },
  {
    accessorKey: 'meaning',
    header: 'ความหมาย',
    size: 300,
    cell: ({ row }) => {
      return <p className="text-center">{row.getValue('meaning') || '-'}</p>;
    },
  },
];
