import { useEffect } from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { get_attendance } from "../Store/reducers/serverReducer";
import { ClearServer } from "../Store/actions/serverActions";
import Attendance from "../Components/AttendancePie";
import {
  StudentVectorImage,
  ExamVectorImage,
  TaskVectorImage,
  Schoolboy,
  OnlineClass,
} from "../Assets/vectorimages/index";
import Breadcrumbs from "../Components/breadcrumbs";

const Container = Styled.div`
   position: relative;
   overflow: scroll;
   width: calc(100vw - 500px);
   height: 100%;
   display: flex;
   flex-direction: column;
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (max-width: 1024px) {
     width: 100vw;
    }
`;

const Content = Styled.div` 
   margin-bottom: 100px;
   padding: 20px;
   @media only screen and (max-width: 768px){
   flex-direction: column;
   margin-top: 10px;
  }
  h1{
    margin: 0;
  }
`;

const Table = Styled.table`
   border-collapse: collapse;
   margin: 25px 0;
   font-size: 0.9em;
   width: 100%;
   border-radius: 20px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-top-right-radius: 30px;
   overflow: hidden;
   @media only screen and (max-width: 768px){
     width: 600px;
   }
   @media only screen and (max-width: 425px){
     width: 200px;
   }

   thead tr{
     background-color: #171717;
     color: white;
     text-align: left;
     font-weight: bold;
   }
   th{
     padding: 12px 15px;
   }
   td{
     padding: 12px 15px;
   }

   tbody tr{
     border-bottom: 1px solid #EEEEEE;
   }

   tbody tr:hover{
    background-color: #f3f3f3;
    cursor: pointer;
   }

   /* tbody tr:nth-of-type(even){
     background-color: #f3f3f3;
   } */

/*    
   tbody tr:last-of-type{
    border-bottom: 2px solid #171717;
   } */
`;

const StudentsContainer = Styled.div`
   
`;

const Students = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ClearServer());
  }, []);

  return (
    <Container>
      <Content>
        <Breadcrumbs pages={["Students"]} />
        <StudentsContainer>
          <Table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Mobile</th>
                <th>Last login</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>
              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>
              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>
              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>

              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>
              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>

              <tr>
                <td>Aug 12 2021</td>
                <td>Commerce</td>
                <td>Pending</td>
                <td>adsdno</td>
              </tr>
            </tbody>
          </Table>
        </StudentsContainer>
      </Content>
    </Container>
  );
};

export default Students;
