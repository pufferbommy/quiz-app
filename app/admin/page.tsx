'use client';

import { Plus } from 'lucide-react';

import { DataTable } from './data-table';
import Title from '@/components/text/title';
import { Question, columns } from './columns';
import { Button } from '@/components/ui/button';
import withAdminAuth from '@/components/wrapper/withAdminAuth';

const Admin = () => {
  const data: Question[] = [
    {
      id: 1,
      no: 1,
      imgPath: '/images/verse/general/01.JPG',
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      id: 2,
      no: 2,
      imgPath: '/images/verse/general/02.JPG',
      answer: {
        first: 'หมู',
        second: 'ไป',
        third: 'ไก่',
        fourth: 'มา',
      },
    },
    {
      id: 3,
      no: 3,
      imgPath: '/images/verse/general/03.JPG',
      answer: {
        first: 'น้ำตา',
        second: 'น้ำชา',
        third: 'น้ำยา',
        fourth: 'น้ำมา',
      },
    },
    {
      id: 4,
      no: 4,
      imgPath: '/images/verse/general/04.JPG',
      answer: {
        first: 'แกว่ง',
        second: 'เท้า',
        third: 'หา',
        fourth: 'เสี้ยน',
      },
    },
    {
      id: 5,
      no: 5,
      imgPath: '/images/verse/general/05.JPG',
      answer: {
        first: 'จับ',
        second: 'ปลา',
        third: 'สอง',
        fourth: 'มือ',
      },
    },
    {
      id: 6,
      no: 6,
      imgPath: '/images/verse/general/06.JPG',
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      id: 7,
      no: 7,
      imgPath: '/images/verse/general/07.JPG',
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      id: 8,
      no: 8,
      imgPath: '/images/verse/general/08.JPG',
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      id: 9,
      no: 9,
      imgPath: '/images/verse/general/09.JPG',
      answer: {
        first: 'คัด',
        second: 'ตึง',
        third: 'ดึง',
        fourth: 'เต้า',
      },
    },
    {
      id: 10,
      no: 10,
      imgPath: '/images/verse/general/010.JPG',
      answer: {
        first: 'น้ำนม',
        second: 'น้ำฝน',
        third: 'น้ำใจ',
        fourth: 'น้ำสุรา',
      },
    },
  ];

  return (
    <>
      <Title>แอดมิน</Title>
      <div className="mb-4 flex items-end gap-8 justify-between">
        <div className="flex gap-8">
          <div>
            <h2 className="mb-2">หมวดหมู่หลัก</h2>
            <div className="flex gap-2 ">
              <Button>กลอน</Button>
              <Button variant="outline">รูป</Button>
            </div>
          </div>
          <div>
            <h2 className="mb-2">หมวดหมู่รอง</h2>
            <div className="flex gap-2 ">
              <Button>สุขภาพ</Button>
              <Button variant="outline">ทั่วไป</Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            เพิ่ม
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default withAdminAuth(Admin);
