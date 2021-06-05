import { FilterByQuestionsPipe } from './filter-by-status-questions.pipe';

describe('FilterByQuestionsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByQuestionsPipe();
    expect(pipe).toBeTruthy();
  });
});
