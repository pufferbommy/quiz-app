'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '../../../../../components/ui/button';
import VerseForm from '../../../../../components/form/verse-form';
import ImageForm from '../../../../../components/form/image-form';
import Link from 'next/link';

const Sub = ({ params }: { params: { category: string; sub: string } }) => {
  const [questions, setQuestions] = useState<
    {
      imgPath: string;
      no: number;
    }[]
  >([]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  const { category, sub } = params;

  const fetchQuestions = async () => {
    const url = `/api/v1/joke-${category}/${sub}`;
    const response = await fetch(url);
    const data = await response.json();
    setQuestions(data.mockData);
  };

  useEffect(() => {
    if (category && sub) {
      fetchQuestions();
    }
  }, [category, sub]);

  useEffect(() => {}, []);

  const title = () => {
    if (!category) return '';
    return category === 'verse' ? 'กลอนปริศนา' : 'โจ๊กภาพปริศนา';
  };

  const questionImgPath = questions[questionIndex]?.imgPath;
  const questionNo = questions[questionIndex]?.no;

  return (
    <>
      {isBreak ? (
        <>
          <div className="relative rounded-full w-[75%] mb-6 mx-auto overflow-hidden aspect-square">
            <Image src="/auth.jpg" alt="auth" fill />
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={() => setIsBreak(false)}>เล่นต่อ</Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                ออกจากเกม
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={() => setIsBreak(true)}
            className="absolute top-4 left-0"
            variant="outline"
            size="icon"
          >
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
            className="text-4xl mb-8 text-center"
            dangerouslySetInnerHTML={{ __html: title() || '&nbsp;' }}
          />
          <div className="relative rounded-md border border-input overflow-hidden mb-8 aspect-video">
            {questionImgPath && (
              <Image
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                priority
                quality={75}
                src={questionImgPath}
                alt=""
                fill
              />
            )}
          </div>
          {category === 'verse' ? (
            <VerseForm
              questionNo={questionNo}
              url={`/api/v1/joke-${category}/${sub}`}
              setQuestionIndex={setQuestionIndex}
            />
          ) : (
            <ImageForm
              questionNo={questionNo}
              url={`/api/v1/joke-${category}/${sub}`}
              setQuestionIndex={setQuestionIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default Sub;
