import bookMetadata from './book.json';
import chapter1 from './chapter-1.json';
import chapter2 from './chapter-2.json';
import chapter3 from './chapter-3.json';
import chapter4 from './chapter-4.json';
import chapter5 from './chapter-5.json';
import chapter6 from './chapter-6.json';
import chapter7 from './chapter-7.json';
import chapter8 from './chapter-8.json';
import chapter9 from './chapter-9.json';
import chapter10 from './chapter-10.json';
import chapter11 from './chapter-11.json';
import chapter12 from './chapter-12.json';
import chapter13 from './chapter-13.json';
import chapter14 from './chapter-14.json';
import chapter15 from './chapter-15.json';
import chapter16 from './chapter-16.json';
import chapter17 from './chapter-17.json';
import chapter18 from './chapter-18.json';
import chapter19 from './chapter-19.json';
import chapter20 from './chapter-20.json';

const chapters = [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13, chapter14, chapter15, chapter16, chapter17, chapter18, chapter19, chapter20];

export const passN3Within20DaysBook = {
  ...bookMetadata,
  chapters
};

export default passN3Within20DaysBook;
