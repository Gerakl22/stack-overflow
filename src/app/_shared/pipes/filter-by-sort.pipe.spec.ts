import { FilterBySortPipe } from './filter-by-sort.pipe';

describe('FilterBySortPipe', () => {
  const sortPipe = new FilterBySortPipe();
  const firstQuestions = {
    author: '123456@mail.ru',
    date: 1,
    title: 'Hello world',
    textarea: 'Thank you very much',
    tags: [],
    comments: [],
    isApproval: false,
  };
  const secondQuestions = {
    author: '123456@mail.ru',
    date: 2,
    title: 'Hi world',
    textarea: 'Thank you',
    tags: [],
    comments: [],
    isApproval: true,
  };
  const thirdQuestions = {
    author: '123456@mail.ru',
    date: 3,
    title: 'Howdy world',
    textarea: 'Thanks a lot',
    tags: [],
    comments: [],
    isApproval: false,
  };
  const fourQuestions = {
    author: '123456@mail.ru',
    date: 4,
    title: 'Hiya world',
    textarea: 'You welcome',
    tags: [],
    comments: [],
    isApproval: true,
  };

  it('create an instance', () => {
    expect(sortPipe).toBeTruthy();
  });

  it('ascending sort questions array by date', () => {
    expect(sortPipe.transform([firstQuestions, fourQuestions, thirdQuestions, secondQuestions], true)).toEqual([
      firstQuestions,
      secondQuestions,
      thirdQuestions,
      fourQuestions,
    ]);
  });

  it('descending sort questions array by date', () => {
    expect(sortPipe.transform([thirdQuestions, secondQuestions, firstQuestions, fourQuestions], false)).toEqual([
      fourQuestions,
      thirdQuestions,
      secondQuestions,
      firstQuestions,
    ]);
  });
});
