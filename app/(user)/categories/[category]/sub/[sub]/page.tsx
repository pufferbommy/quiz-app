'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import { Fragment, useState } from 'react';

import Logo from '@/components/logo';
import useQuestions from '@/hooks/useQuestions';
import { Button } from '@/components/ui/button';
import VerseForm from '@/components/form/VerseForm';
import ImageForm from '@/components/form/ImageForm';
import PauseMenu from '@/components/game/PauseMenu';

const Sub = ({ params }: { params: { category: string; sub: string } }) => {
  const { category, sub } = params;
  const url = `/api/v1/jokes/${category}s/${sub}`;
  const { questions, isLoading, shuffleQuestions } = useQuestions(url);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const title = category === 'verse' ? 'กลอนปริศนา' : 'โจ๊กภาพปริศนา';
  const question = questions[questionIndex] || null;

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      shuffleQuestions();
      setQuestionIndex(0);
    } else {
      setQuestionIndex(prev => prev + 1);
    }
  };

  return (
    <>
      {isBreak ? (
        <PauseMenu resumeGame={() => setIsBreak(false)} />
      ) : (
        <>
          <Button
            onClick={() => setIsBreak(true)}
            className="absolute top-4 left-0"
            variant="outline"
            size="icon"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <h1 className="text-4xl mb-4 text-center">{title}</h1>
          {isLoading ? (
            <p className="text-center">กำลังโหลด...</p>
          ) : questions.length === 0 ? (
            <div className="flex flex-col items-center">
              <p className="mb-2">ไม่พบข้อมูล</p>
              <Logo />
              <Link className="w-full" href="/">
                <Button className="w-full" variant="outline">
                  กลับสู่หน้าหลัก
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="relative rounded-md border border-input overflow-hidden mb-4 aspect-video">
                <span
                  className={`absolute z-10 inset-0 duration-300 flex justify-center items-center ${
                    isLoadingImage ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  กำลังโหลดรูป...
                </span>
                {questions.map(q => (
                  <Fragment key={q.id}>
                    {q.id === question.id && (
                      <Image
                        key={q.imagePath}
                        className={`transition-opacity duration-500 ${
                          isLoadingImage ? 'opacity-0' : 'opacity-100'
                        }`}
                        sizes="100%"
                        priority
                        quality={75}
                        src={q.imagePath}
                        onLoadingComplete={() => {
                          setIsLoadingImage(false);
                        }}
                        alt=""
                        fill
                      />
                    )}
                  </Fragment>
                ))}
              </div>
              {category === 'verse' ? (
                <VerseForm
                  isLoadingImage={isLoadingImage}
                  setIsLoadingImage={setIsLoadingImage}
                  questionId={question?.id}
                  url={url}
                  nextQuestion={nextQuestion}
                />
              ) : (
                <ImageForm
                  isLoadingImage={isLoadingImage}
                  setIsLoadingImage={setIsLoadingImage}
                  questionId={question?.id}
                  url={url}
                  nextQuestion={nextQuestion}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Sub;
