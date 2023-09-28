import Image from 'next/image';
import { useContext } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { AdminContext } from './page';
import { AdminQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ActionsProps {
  questionId: number;
}

const Actions = ({ questionId }: ActionsProps) => {
  const { deleteQuestion } = useContext(AdminContext);

  const handleDeleteQuestionClick = async () => {
    const isConfirmed = confirm('คุณต้องการลบคำถามนี้ใช่หรือไม่');
    if (isConfirmed) deleteQuestion(questionId);
  };

  return (
    <div className="flex justify-center gap-2">
      <Button variant="outline" size="icon">
        <Pencil className="w-4 h-4" />
      </Button>
      <Button onClick={handleDeleteQuestionClick} variant="outline" size="icon">
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<AdminQuestion>[] = [
  {
    header: 'การจัดการ',
    size: 0,
    cell: ({ row }) => <Actions questionId={row.original.id} />,
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
        return <p>{answer}</p>;
      }
      const { first, second, third, fourth } = answer;
      return (
        <ul className="flex flex-col gap-2">
          <li>1. {first}</li>
          <li>2. {second}</li>
          <li>3. {third}</li>
          <li>4. {fourth}</li>
        </ul>
      );
    },
  },
];
