import Image from 'next/image';
import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

export interface Question {
  id: number;
  no: number;
  imgPath: string;
  answer: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
}

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: 'no',
    header: 'ลำดับ',
    size: 0,
  },
  {
    id: 'action',
    header: 'การจัดการ',
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'imgPath',
    header: 'รูป',
    cell: ({ row }) => {
      return (
        <div className="relative rounded-md border border-input overflow-hidden aspect-video">
          <Image priority sizes="100%" fill src={row.getValue('imgPath')} alt="" />
        </div>
      );
    },
  },
  {
    accessorKey: 'answer',
    header: 'คำตอบ',
    cell: ({ row }) => {
      const { first, second, third, fourth } = row.getValue('answer') as Question['answer'];
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
