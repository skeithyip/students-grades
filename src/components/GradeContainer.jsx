import { useDispatch, useSelector } from 'react-redux';

import {
  selectStudentGrade,
  selectStudentIds,
  fetchGrades,
} from 'slices/studentGradeSlice';

const GradeContainer = () => {
  const ids = useSelector(selectStudentIds);
  const status = useSelector((state) => state.status);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else if (status === 'failed') {
    return <ErrorContent />;
  }

  return ids?.map((id) => <StudentCard key={id} id={id} />);
};

const StudentCard = ({ id }) => {
  const grade = useSelector((state) => selectStudentGrade(state, id));
  const { courseIds, gpa } = grade;

  return (
    <div>
      <div>student</div>
      {id}
      <div>{courseIds.join(', ')}</div>
      <div>
        <span>GPA</span>
        {gpa}
      </div>
    </div>
  );
};

const ErrorContent = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.error);

  const onClick = () => dispatch(fetchGrades());

  return (
    <div>
      <div>{message}</div>
      <button type="button" onClick={onClick}>
        Try again
      </button>
    </div>
  );
};

export default GradeContainer;
