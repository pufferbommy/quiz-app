import { Button } from '@/components/ui/button';
import React from 'react';

const Index = () => {
  return (
    <div className="h-screen px-3">
      <div className="max-w-md mx-auto h-full">
        <div className="flex flex-col justify-center h-full items-center">
          <h1 className="text-4xl mb-6">โจ๊กปริศนา</h1>
          <div className="w-full flex flex-col gap-3">
            <Button variant="outline">หมวดกลอน</Button>
            <Button variant="outline">หมวดภาพ</Button>
            <Button variant="outline">อันดับประจำสัปดาห์</Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">การตั้งค่า</Button>
              <Button variant="outline">วิธีการเล่น</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
