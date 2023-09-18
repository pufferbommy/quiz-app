import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
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
import { VerseSchema, verseSchema } from '../../schemas/joke/verse';

interface Props {
  url: string;
  questionNo: number;
  questionsLength: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const VerseForm = ({
  url,
  questionNo,
  questionsLength,
  setQuestionIndex,
}: Props) => {
  const [response, setResponse] = useState<{
    isCorrect: boolean;
    answer?: {
      first: string;
      second: string;
      third: string;
      fourth: string;
    };
    meaning?: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setQuestionIndex((prev) => (prev + 1) % questionsLength);
    setResponse(null);
    form.reset();
  };

  const onSubmit = async (values: VerseSchema) => {
    setIsSubmitting(true);
    const response = await fetch(url, {
      body: JSON.stringify(values),
      method: 'POST',
    });
    const data = await response.json();
    setTimeout(() => {
      if (data.isCorrect) {
        setResponse(data);
      } else {
        handleNextQuestionClick();
      }
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    if (questionNo) {
      form.setValue('no', questionNo);
    }
  }, [questionNo, form]);

  return (
    <>
      {!response?.isCorrect && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              control={form.control}
              name="inputSecond"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="ช่องใส่คำตอบ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            <div className="grid grid-cols-2 mt-4 gap-4">
              <Button
                disabled={isSubmitting}
                onClick={handleNextQuestionClick}
                type="button"
                variant="outline"
              >
                ข้าม
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {!isSubmitting ? 'ส่ง' : 'กำลังส่ง...'}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {response?.isCorrect && (
        <>
          <div className="text-center mb-4">
            <h2 className="text-2xl underline underline-offset-4 mb-4">เฉลย</h2>
            <ul className="text-lg space-y-4 mb-4">
              {response.answer &&
                Object.keys(response.answer).map((key, index) => (
                  <li className="flex justify-between" key={key}>
                    <span>ช่องที่ {index + 1}</span>
                    <span>
                      {response.answer?.[key as keyof typeof response.answer]}
                    </span>
                  </li>
                ))}
            </ul>
            <div className="bg-secondary border p-4 tracking-wide rounded-md">
              {response.meaning}
            </div>
          </div>
        </>
      )}
      {response?.isCorrect && (
        <Button onClick={handleNextQuestionClick} className="w-full">
          ถัดไป
        </Button>
      )}
    </>
  );
};

export default VerseForm;
