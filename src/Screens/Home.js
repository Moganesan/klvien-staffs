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
  OnlineClassVectorImage,
} from "../Assets/vectorimages/source";

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

const Announcement = Styled.div`
   width: 350px;
   height: 130px;
   background: linear-gradient(179.44deg, #FF958C 0.49%, #FF81C1 99.51%);
   margin-left: 30px;
   border-radius: 30px;
   display: flex;
   text-align: center;
   align-items: center;
   font-weight: bold; 
   color: white;
   font-size: 15px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   @media only screen and (max-width: 768px){
   margin-top: 30px;
   }
   @media only screen and (max-width: 320px){
     width: 95%;
     margin-left: 0px;
   }
`;

const Dashboard = Styled.div`
   display: grid;
   grid-gap: 25px;
   grid-template-columns: repeat(4, minmax(0,1fr));
   background: white;
   margin-top: 20px;
   margin-bottom: 20px;
`;

const Info = Styled.div`
   display: flex;
   flex-direction: column;
   width: 185px;
   height: 205px;
   background-color: rgba(77, 213, 153, 0.4);
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 20px;
   border: 1px solid rgba(77, 213, 153, 0.4);
   align-items: center;
   cursor: pointer;
   transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
   &:hover{
    transform: scale(0.9);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid black;
   }
   justify-content: space-evenly;
   h3{
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

const data = [
  {
    id: "Overall Attendance",
    label: "Precent",
    value: 90,
    color: "hsl(249, 70%, 50%)",
  },
  {
    id: "Absent",
    label: "Absent",
    value: 10,
    color: "hsl(102, 70%, 50%)",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.Server["attendance"]);
  useEffect(async () => {
    await dispatch(ClearServer());
    // await dispatch(get_attendance());
  }, []);

  return (
    <Container>
      <Content>
        <h1>Dashboard</h1>
        <Dashboard>
          <Info>
            <StudentVectorImage width={140} height={140} />
            <h3>15 Students</h3>
          </Info>
          <Info>
            <TaskVectorImage width={140} height={140} />
            <h3>19 Assignments</h3>
          </Info>
          <Info>
            <ExamVectorImage width={140} height={140} />
            <h3>12 Exams</h3>
          </Info>
          <Info>
            <OnlineClassVectorImage width={140} height={140} />
            <h3>17 Classes</h3>
          </Info>
        </Dashboard>
        <h2>Students</h2>
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

export default Home;
