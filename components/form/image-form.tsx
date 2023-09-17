import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ImgSchema, imgSchema } from '../../schemas/joke/img';
import { useEffect, useState } from 'react';

interface Props {
  url: string;
  questionNo: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ImageForm = ({ url, questionNo, setQuestionIndex }: Props) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const form = useForm<ImgSchema>({
    resolver: zodResolver(imgSchema),
    defaultValues: {
      answer: '',
      group: 'image',
    },
  });

  const handleNextQuestionClick = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsCorrect(false);
    setDescription('');
    form.reset();
  };

  const onSubmit = async (values: ImgSchema) => {
    const response = await fetch(url, {
      body: JSON.stringify(values),
      method: 'POST',
    });
    const data = await response.json();
    if (data.message === true) {
      setIsCorrect(true);
      setDescription(data.description);
    } else {
      setQuestionIndex((prev) => prev + 1);
      form.reset();
    }
  };

  useEffect(() => {
    if (questionNo) {
      form.setValue('no', questionNo);
    }
  }, [questionNo, form]);

  return (
    <>
      {!isCorrect && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ช่องใส่คำตอบ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 mt-6 gap-3">
              <Button
                onClick={handleNextQuestionClick}
                type="button"
                variant="outline"
              >
                ข้าม
              </Button>
              <Button type="submit">ส่ง</Button>
            </div>
          </form>
        </Form>
      )}
      {isCorrect && <p className="text-center mb-6">{description}</p>}
      {isCorrect && (
        <Button onClick={handleNextQuestionClick} className="w-full">
          ถัดไป
        </Button>
      )}
    </>
  );
};

export default ImageForm;
