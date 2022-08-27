import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import reduce from 'reducers/reduceStudentGrade';

const PATH =
  'https://quanmgx57hjiqicdxgo2vzebqq0tghim.lambda-url.ap-southeast-1.on.aws/';
const TIMEOUT = 3000;

export const fetchGrades = createAsyncThunk(
  'studentsGrades/fetch',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => {
      controller.abort();
      if (thunkAPI.getState().retry < 2) {
        dispatch(fetchGrades());
      }
    }, TIMEOUT);

    try {
      const response = await fetch(PATH, { signal });
      clearTimeout(id);

      const body = await response.json();

      return body;
    } catch (err) {
      if (!signal.aborted) {
        if (thunkAPI.getState().retry < 2) {
          dispatch(fetchGrades());
        }
      }
      throw err;
    }
  }
);

export const studentGradeSlice = createSlice({
  name: 'studentGrade',
  initialState: {
    status: 'idle',
    studentGrade: undefined,
    error: null,
    retry: 0,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studentGrade = reduce(action.payload);
        state.error = undefined;
        state.retry = 0;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        if (state.retry < 2) {
          state.status = 'loading';
          state.retry++;
        } else {
          state.status = 'failed';
          state.error = action.error.message;
          state.retry = 0;
        }
      });
  },
});

export default studentGradeSlice.reducer;

export const selectStudentGrade = (state, studentId) =>
  state.studentGrade?.grades?.[studentId];
export const selectStudentIds = (state) => state.studentGrade?.ids;
