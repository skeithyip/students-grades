import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectStudentGrade,
  selectStudentIds,
  fetchGrades,
} from 'slices/studentGradeSlice';

const Card = styled.div`
  flex: 0 0 160px;
  height: 160px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
`;
const StudentTitle = styled.div`
  font-size: 0.75em;
`;
const StudentID = styled.div`
  font-size: 2.5em;
`;
const CourseIDs = styled.div`
  font-size: 0.75em;
`;
const GPAContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
`;
const GPALabel = styled.div`
  margin-left: auto;
  align-self: flex-end;
  font-size: 0.75em;
  line-height: 1;
`;
const GPAScore = styled.div`
  align-self: end;
  font-size: 2.5em;
  line-height: 1em;
  height: 36px;
  margin-top: 5px;
  margin-left: 5px;
`;
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;
const ErrorButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const LoadingContainer = styled(ErrorButtonContainer)`
  display: flex;
  justify-content: center;
  width: 100%;
  color: rgb(126, 126, 126);
`;
const ErrorButton = styled.button`
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid #ddd;
  padding: 5px 40px;
  font-size: 1em;
  border-radius: 10px;
  cursor: pointer;

  &::before {
    content: '\\27f3';
    padding-right: 5px;
    font-weight: 600;
  }
`;

const GradeContainer = () => {
  const ids = useSelector(selectStudentIds);
  const status = useSelector((state) => state.status);

  if (status === 'loading') {
    return <LoadingContainer>Loading...</LoadingContainer>;
  } else if (status === 'failed') {
    return <ErrorContent />;
  } else if (!ids?.length) {
    return <LoadingContainer>No grades found</LoadingContainer>;
  }

  return ids?.map((id) => <StudentCard key={id} id={id} />);
};

const StudentCard = ({ id }) => {
  const grade = useSelector((state) => selectStudentGrade(state, id));
  const { courseIds, gpa } = grade;

  return (
    <Card>
      <StudentTitle>student</StudentTitle>
      <StudentID>{id}</StudentID>
      <CourseIDs>{courseIds.join(', ')}</CourseIDs>
      <GPAContainer>
        <GPALabel>GPA</GPALabel>
        <GPAScore>{gpa}</GPAScore>
      </GPAContainer>
    </Card>
  );
};

const ErrorContent = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.error);

  const onClick = () => dispatch(fetchGrades());

  return (
    <ContentContainer>
      <ErrorButtonContainer>
        <img src="error.png" alt="error" />
      </ErrorButtonContainer>
      <div>{message}</div>
      <ErrorButtonContainer>
        <ErrorButton type="button" onClick={onClick}>
          Try again
        </ErrorButton>
      </ErrorButtonContainer>
    </ContentContainer>
  );
};

export default GradeContainer;
