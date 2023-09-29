import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

import {
  AdminQuestionData,
  StatusMessageDataResponse,
  StatusMessageResponse,
  UploadFileSuccessData,
  VerseAnswer,
} from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ImageQuestionSchema,
  VerseQuestionSchema,
  imageQuestionSchema,
  verseQuestionSchema,
} from '@/schemas/joke/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { AdminContext } from '@/app/admin/page';

interface EditQuestionDialogProps {
  oldCategory: string;
  questionId: number;
}

const EditQuestionDialog = ({ oldCategory, questionId }: EditQuestionDialogProps) => {
  const { fetchQuestions } = useContext(AdminContext);
  const { toast } = useToast();
  const [category, setCategory] = useState<null | 'verse' | 'image'>(null);
  const [subCategory, setSubCategory] = useState<null | 'health' | 'general'>(null);
  const [open, setOpen] = useState(false);
  const [meaning, setMeaning] = useState('');

  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageForm = useForm<ImageQuestionSchema>({
    resolver: zodResolver(imageQuestionSchema),
    defaultValues: {
      imagePath: '',
      answer: '',
      meaning: '',
    },
  });

  const verseForm = useForm<VerseQuestionSchema>({
    resolver: zodResolver(verseQuestionSchema),
    defaultValues: {
      imagePath: '',
      answer: {
        first: '',
        second: '',
        third: '',
        fourth: '',
      },
      meaning: '',
    },
  });

  const onSubmit = async (values: VerseQuestionSchema | ImageQuestionSchema) => {
    if (
      (verseForm.formState.isSubmitted || imageForm.formState.isSubmitted) &&
      (!selectedImage || !selectedImageUrl)
    ) {
      return;
    }

    let uploadFileResultDataFilePath = selectedImageUrl;

    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage as File);
      const uploadFileResponse = await fetch(`/api/v1/files`, {
        body: formData,
        method: 'POST',
      });
      const uploadFileResult: StatusMessageDataResponse<UploadFileSuccessData> =
        await uploadFileResponse.json();
      uploadFileResultDataFilePath = uploadFileResult.data.filePath;
    }

    const updateQuestionResponse = await fetch(
      `/api/v1/admin/${category}s/${subCategory}?questionId=${questionId}`,
      {
        body: JSON.stringify({
          ...values,
          imagePath: uploadFileResultDataFilePath,
          meaning,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    );
    const updateQuestionResult: StatusMessageResponse = await updateQuestionResponse.json();
    toast({
      title: updateQuestionResult.status,
      description: updateQuestionResult.message,
      variant: updateQuestionResult.status === 'success' ? 'default' : 'destructive',
    });
    setOpen(false);
    fetchQuestions();
  };

  useEffect(() => {
    if (open) {
      (async () => {
        const response = await fetch(
          `/api/v1/admin/questions?category=${oldCategory}&questionId=${questionId}`
        );
        const result: StatusMessageDataResponse<AdminQuestionData> = await response.json();
        const { question } = result.data;
        if (question) {
          setCategory(question.category as 'verse' | 'image');
          setSubCategory(question.subCategory as 'health' | 'general');
          setSelectedImageUrl(question.imagePath);
          setMeaning(question.meaning);
          if (question.category === 'verse') {
            const { first, second, third, fourth } = question.answer as VerseAnswer;
            verseForm.setValue('answer.first', first);
            verseForm.setValue('answer.second', second);
            verseForm.setValue('answer.third', third);
            verseForm.setValue('answer.fourth', fourth);
            verseForm.setValue('meaning', '5555');
          } else {
            imageForm.setValue('answer', question.answer as string);
          }
        }
      })();
    } else {
      imageForm.reset();
      verseForm.reset();
      setSelectedImage(undefined);
      setCategory(null);
      setSubCategory(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent autoFocus={false} className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>แก้ไขคำถาม</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image">รูป</Label>
              <Input
                onChange={imageChange}
                accept="image/*"
                id="image"
                type="file"
                className="col-span-3 rounded-md"
              />
            </div>
            {(verseForm.formState.isSubmitted || imageForm.formState.isSubmitted) &&
              !selectedImageUrl && (
                <div className="grid grid-cols-4 items-center gap-4 mt-2">
                  <div></div>
                  <p className="text-sm font-medium text-destructive col-span-3">กรุณาเลือกรูป</p>
                </div>
              )}
          </div>
          {selectedImageUrl && (
            <div className="relative border w-full rounded-md aspect-video overflow-hidden">
              <Image sizes="100%" className="w-full" fill src={selectedImageUrl} alt="" />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category">หมวดหลัก</Label>
            <Select
              value={category!}
              onValueChange={value => {
                verseForm.reset();
                imageForm.reset();
                setCategory(value as typeof category);
              }}
            >
              <SelectTrigger id="category" className="col-span-3">
                <SelectValue placeholder="เลือกหมวดหลัก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verse">กลอน</SelectItem>
                <SelectItem value="image">รูป</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subCategory">หมวดย่อย</Label>
            <Select
              value={subCategory!}
              onValueChange={value => setSubCategory(value as 'health' | 'general')}
            >
              <SelectTrigger id="subCategory" className="col-span-3">
                <SelectValue placeholder="เลือกหมวดย่อย" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">สุขภาพ</SelectItem>
                <SelectItem value="general">ทั่วไป</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {category === 'image' && subCategory && (
            <Form {...imageForm}>
              <form className="grid gap-4" onSubmit={imageForm.handleSubmit(onSubmit)}>
                <FormField
                  control={imageForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="answer">คำตอบ</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Input id="answer" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="meaning">ความหมาย</FormLabel>
                    <FormControl className="col-span-3 !mt-0">
                      <Textarea
                        rows={4}
                        id="meaning"
                        className="resize-none"
                        value={meaning}
                        onChange={e => setMeaning(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </FormItem>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setOpen(false)} type="button" variant="outline">
                    ยกเลิก
                  </Button>
                  <Button type="submit">ยืนยัน</Button>
                </div>
              </form>
            </Form>
          )}
          {category === 'verse' && subCategory && (
            <Form {...verseForm}>
              <form className="grid gap-4" onSubmit={verseForm.handleSubmit(onSubmit)}>
                <FormField
                  control={verseForm.control}
                  name="answer.first"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="answer1">คำตอบ 1</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Input className="rounded-md" id="answer1" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={verseForm.control}
                  name="answer.second"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="answer2">คำตอบ 2</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Input className="rounded-md" id="answer2" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={verseForm.control}
                  name="answer.third"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="answer3">คำตอบ 3</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Input className="rounded-md" id="answer3" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={verseForm.control}
                  name="answer.fourth"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="answer4">คำตอบ 4</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Input className="rounded-md" id="answer4" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="meaning">ความหมาย</FormLabel>
                    <FormControl className="col-span-3 !mt-0">
                      <Textarea
                        rows={4}
                        id="meaning"
                        className="resize-none"
                        value={meaning}
                        onChange={e => setMeaning(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </FormItem>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setOpen(false)} type="button" variant="outline">
                    ยกเลิก
                  </Button>
                  <Button type="submit">ยืนยัน</Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
