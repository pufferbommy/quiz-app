import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { ImgSchema, imgSchema } from '../../schemas/joke/img';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';

interface Props {
  url: string;
  questionNo: number | undefined;
  nextQuestion: () => void;
  isLoadingImage: boolean;
  setIsLoadingImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageForm = ({ url, questionNo, nextQuestion, isLoadingImage, setIsLoadingImage }: Props) => {
  const { toast } = useToast();
  const [response, setResponse] = useState<{
    isCorrect: boolean;
    answer?: string;
    meaning?: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ImgSchema>({
    resolver: zodResolver(imgSchema),
    defaultValues: {
      answer: '',
      group: 'image',
    },
  });

  const handleSkipQuestionClick = () => {
    handleNextQuestionClick();
  };

  const handleNextQuestionClick = () => {
    setIsLoadingImage(true);
    nextQuestion();
    setResponse(null);
    form.reset();
  };

  const onSubmit = async (values: ImgSchema) => {
    setIsSubmitting(true);
    const response = await fetch(url, {
      body: JSON.stringify(values),
      method: 'POST',
    });
    const data = await response.json();
    toast({
      title: 'ผลการตรวจคำตอบ',
      description: data.isCorrect ? 'ถูกต้อง' : 'ผิด',
      variant: data.isCorrect ? 'default' : 'destructive',
    });
    if (data.isCorrect) {
      setResponse(data);
    } else {
      handleNextQuestionClick();
    }
    setIsSubmitting(false);
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={isSubmitting}
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
            <div className="grid grid-cols-2 mt-4 gap-4">
              <Button
                disabled={isSubmitting || isLoadingImage}
                onClick={handleSkipQuestionClick}
                type="button"
                variant="outline"
              >
                ข้าม
              </Button>
              <Button disabled={isSubmitting || isLoadingImage} type="submit">
                {!isSubmitting ? 'ส่ง' : 'กำลังส่ง...'}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {response?.isCorrect && (
        <div className="text-center mb-4">
          <h2 className="text-2xl underline underline-offset-4 mb-4">เฉลย</h2>
          <h3 className="text-lg mb-4">{response.answer}</h3>
          <div className="bg-secondary border p-4 tracking-wide rounded-md">{response.meaning}</div>
        </div>
      )}
      {response?.isCorrect && (
        <Button onClick={handleNextQuestionClick} className="w-full">
          ถัดไป
        </Button>
      )}
    </>
  );
};

export default ImageForm;