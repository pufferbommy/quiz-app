import Image from 'next/image';
import { Plus } from 'lucide-react';
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';

import {
  StatusMessageDataResponse,
  StatusMessageResponse,
  UploadFileSuccessData,
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

const CreateQuestionDialog = () => {
  const { fetchQuestions } = useContext(AdminContext);
  const { toast } = useToast();
  const [category, setCategory] = useState<null | 'verse' | 'image'>(null);
  const [subCategory, setSubCategory] = useState<null | 'health' | 'general'>(null);
  const [open, setOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File>();

  const selectedImageUrl = useMemo(() => {
    if (!selectedImage) return '';
    return URL.createObjectURL(selectedImage!);
  }, [selectedImage]);

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
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
    if ((verseForm.formState.isSubmitted || imageForm.formState.isSubmitted) && !selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage as File);
    const uploadFileResponse = await fetch(`/api/v1/files`, {
      body: formData,
      method: 'POST',
    });
    const uploadFileResult: StatusMessageDataResponse<UploadFileSuccessData> =
      await uploadFileResponse.json();
    const createQuestionResponse = await fetch(`/api/v1/admin/${category}s/${subCategory}`, {
      body: JSON.stringify({
        ...values,
        imagePath: uploadFileResult.data.filePath,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const createQuestionResult: StatusMessageResponse = await createQuestionResponse.json();
    toast({
      title: createQuestionResult.status,
      description: createQuestionResult.message,
      variant: createQuestionResult.status === 'success' ? 'default' : 'destructive',
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      imageForm.reset();
      verseForm.reset();
      setSelectedImage(undefined);
      URL.revokeObjectURL(selectedImageUrl);
      setCategory(null);
      setSubCategory(null);
      fetchQuestions();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          เพิ่ม
        </Button>
      </DialogTrigger>
      <DialogContent autoFocus={false} className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>เพิ่มคำถาม</DialogTitle>
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
              !selectedImage && (
                <div className="grid grid-cols-4 items-center gap-4 mt-2">
                  <div></div>
                  <p className="text-sm font-medium text-destructive col-span-3">กรุณาเลือกรูป</p>
                </div>
              )}
          </div>
          {selectedImage && (
            <div className="relative border w-full rounded-md aspect-video overflow-hidden">
              <Image className="w-full" fill src={selectedImageUrl} alt="" />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category">หมวดหลัก</Label>
            <Select
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
            <Select onValueChange={value => setSubCategory(value as 'health' | 'general')}>
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
                <FormField
                  control={imageForm.control}
                  name="meaning"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="meaning">ความหมาย</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Textarea id="meaning" className="resize-none" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={imageForm.control}
                  name="meaning"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="meaning">ความหมาย</FormLabel>
                        <FormControl className="col-span-3 !mt-0">
                          <Textarea id="meaning" className="resize-none" {...field} />
                        </FormControl>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <FormMessage className="col-span-3" />
                      </div>
                    </FormItem>
                  )}
                />
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

export default CreateQuestionDialog;
