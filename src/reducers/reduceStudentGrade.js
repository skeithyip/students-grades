const reduce = (data) => {
  return data.reduce(
    (acc, e) => {
      if (!acc.grades[e.student_id]) {
        acc.grades[e.student_id] = {};
      }
      const ids = acc?.ids || [];
      if (!ids.includes(e.student_id)) {
        ids.push(e.student_id);
      }
      const courseIds = [
        ...(acc.grades[e.student_id].courseIds || []),
        e.course_id,
      ];
      const totalGp = (acc.grades[e.student_id].totalGp || 0) + e.course_grade;
      const gpa = totalGp / courseIds.length;

      acc.ids = ids.sort();
      acc.grades[e.student_id] = {
        ...acc.grades[e.student_id],
        courseIds,
        totalGp,
        gpa,
      };

      return acc;
    },
    { grades: {} }
  );
};

export default reduce;
