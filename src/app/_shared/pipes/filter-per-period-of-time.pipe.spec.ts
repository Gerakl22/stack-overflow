import { FilterPerPeriodOfTimePipe } from './filter-per-period-of-time.pipe';

describe('Mocking the Date object', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });
  const firstQuestions = {
    author: '123456@mail.ru',
    date: 1623231683465,
    title: 'Hello world',
    textarea: 'Thank you very much',
    tags: [],
    comments: [],
    isApproval: false,
  };
  const secondQuestions = {
    author: '123456@mail.ru',
    date: 1623131537141,
    title: 'Hi world',
    textarea: 'Thank you',
    tags: [],
    comments: [],
    isApproval: true,
  };
  const thirdQuestions = {
    author: '123456@mail.ru',
    date: 1622031537141,
    title: 'Howdy world',
    textarea: 'Thanks a lot',
    tags: [],
    comments: [],
    isApproval: false,
  };
  const fourQuestions = {
    author: '123456@mail.ru',
    date: 1423131207457,
    title: 'Hiya world',
    textarea: 'You welcome',
    tags: [],
    comments: [],
    isApproval: true,
  };

  it('mocks the Date object and sets it to a given time', () => {
    let baseTime = new Date(2021, 6, 9);
    jasmine.clock().mockDate(baseTime);
    jasmine.clock().tick(50);

    expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
  });

  const perPeriodOfTimePipe = new FilterPerPeriodOfTimePipe();

  describe('FilterPerPeriodOfTimePipe', () => {
    it('create in instance', () => {
      expect(perPeriodOfTimePipe).toBeTruthy();
    });

    it('filter questions array per day', () => {
      expect(perPeriodOfTimePipe.transform([firstQuestions, secondQuestions, thirdQuestions, fourQuestions], 1)).toEqual([firstQuestions]);
    });

    it('filter questions array per week', () => {
      expect(perPeriodOfTimePipe.transform([firstQuestions, secondQuestions, thirdQuestions, fourQuestions], 7)).toEqual([
        firstQuestions,
        secondQuestions,
      ]);
    });

    it('filter questions array per month', () => {
      expect(perPeriodOfTimePipe.transform([firstQuestions, secondQuestions, thirdQuestions, fourQuestions], 30)).toEqual([
        firstQuestions,
        secondQuestions,
        thirdQuestions,
      ]);
    });

    it('filter questions array per all time', () => {
      expect(perPeriodOfTimePipe.transform([firstQuestions, secondQuestions, thirdQuestions, fourQuestions], 365)).toEqual([
        firstQuestions,
        secondQuestions,
        thirdQuestions,
        fourQuestions,
      ]);
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
