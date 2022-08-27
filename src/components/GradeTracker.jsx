import * as React from 'react';
import { useDispatch } from 'react-redux';

import GradeContainer from './GradeContainer';

import { fetchGrades } from 'slices/studentGradeSlice';

function GradeTracker() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  return (
    <div className="grade-tracker-container">
      <GradeContainer />
    </div>
  );
}

export default GradeTracker;
