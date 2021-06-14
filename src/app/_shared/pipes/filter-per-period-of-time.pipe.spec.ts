import { FilterPerPeriodOfTimePipe } from './filter-per-period-of-time.pipe';

describe('Mocking the Date object', () => {
  beforeEach(() => {
    jasmine.clock().install();
    const fakeTime = 1624131683465;
    jasmine.clock().mockDate(new Date(fakeTime));
  });

  const firstQuestions = {
    author: '123456@mail.ru',
    date: 1624231683465,
    title: 'Hello world',
    textarea: 'Thank you very much',
    tags: [],
    comments: [],
    isApproval: false,
  };
  const secondQuestions = {
    author: '123456@mail.ru',
    date: 1623531537141,
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

  describe('FilterPerPeriodOfTimePipe', () => {
    const perPeriodOfTimePipe = new FilterPerPeriodOfTimePipe();

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
      expect(perPeriodOfTimePipe.transform([firstQuestions, secondQuestions, thirdQuestions, fourQuestions], null)).toEqual([
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
