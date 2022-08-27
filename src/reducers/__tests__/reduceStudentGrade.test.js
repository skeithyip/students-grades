import sample from '../sample.json';
import reduce from '../reduceStudentGrade';

describe('Reducer should reduce data to student key with courses and gpa', () => {
  test('should has student id key', () => {
    expect(reduce(sample).grades[1902001]).toBeTruthy();
  });

  test('should has student id course ids array', () => {
    expect(reduce(sample).grades[1902001]?.courseIds).toEqual([
      'CS101',
      'CS203',
      'CS101',
    ]);
  });

  test('should has student gpa', () => {
    expect(reduce(sample).grades[1902001]?.gpa).toBe(2);
  });

  test('should has student ids', () => {
    expect(reduce(sample).ids).toEqual([
      '1902004',
      '1902003',
      '1902001',
      '1902002',
      '1902003',
    ]);
  });
});
