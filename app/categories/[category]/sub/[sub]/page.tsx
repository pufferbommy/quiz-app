'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '../../../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { useForm } from 'react-hook-form';
import { VerseSchema, verseSchema } from '../../../../../zodSchema/joke/verse';
import { zodResolver } from '@hookform/resolvers/zod';

const Sub = ({ params }: { params: { category: string; sub: string } }) => {
  const [questions, setQuestions] = useState<
    {
      imgPath: string;
      no: number;
    }[]
  >([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [questionIndex, setQuestionIndex] = useState(0);

  const { category, sub } = params;

  const fetchQuestions = async () => {
    const url = `/api/joke-${category}/${sub}`;
    const response = await fetch(url);
    const data = await response.json();
    setQuestions(data.mockData);
  };

  const form = useForm<VerseSchema>({
    resolver: zodResolver(verseSchema),
    defaultValues: {
      inputFirst: '',
      inputSecond: '',
      inputThird: '',
      inputFourth: '',
    },
  });

  const handleNextQuestionClick = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsCorrect(false);
    setDescription('');
    form.reset();
  };

  const onSubmit = async (values: VerseSchema) => {
    const url = `/api/${categoryMap.get(category as string)}/${sub}`;
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
    if (category && sub) {
      fetchQuestions();
    }
  }, [category, sub]);

  const title = () => {
    if (!category) return '';
    return category === 'verse' ? 'กลอนปริศนา' : 'โจ๊กภาพปริศนา';
  };

  const question = questions[questionIndex]?.imgPath;

  return (
    <>
      <Button className="absolute top-3 left-0" variant="secondary" size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
        </svg>
      </Button>
      <h1
        className="text-4xl mb-6 text-center"
        dangerouslySetInnerHTML={{ __html: title() || '&nbsp;' }}
      />
      <div className="relative rounded-md border border-input overflow-hidden mb-6 aspect-video">
        {question && (
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
            priority
            quality={75}
            src={question}
            alt=""
            fill
          />
        )}
      </div>
      {!isCorrect && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="inputFirst"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ช่องใส่คำตอบ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inputSecond"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ช่องใส่คำตอบ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inputThird"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ช่องใส่คำตอบ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inputFourth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ช่องใส่คำตอบ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 mt-3 gap-3">
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

export default Sub;
