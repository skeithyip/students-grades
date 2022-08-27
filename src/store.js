import { configureStore } from '@reduxjs/toolkit';

import studentsGrades from './slices/studentGradeSlice';

export default configureStore({
  reducer: studentsGrades,
});
