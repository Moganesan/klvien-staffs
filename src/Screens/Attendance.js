import { useEffect } from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { get_attendance } from "../Store/reducers/serverReducer";
import { ClearServer } from "../Store/actions/serverActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import {
  StudentVectorImage,
  Schoolboy,
  TaskVectorImage,
  ExamVectorImage,
  OnlineClass,
  TamilPongalVectorImage,
  EnglishStatueofLiberty,
  Mathemetics,
  Science,
  SocialScience,
  History,
  Biology,
  Chemistery,
  Accountancy,
  Physics,
  Zoology,
  Statistics,
  ComputerScience,
  SpaceScience,
  EnglishStatueofLibertyVectorImage,
  MathemeticsVectorImage,
  ScienceVectorImage,
  SocialScienceVectorImage,
  HistoryVectorImage,
  BiologyVectorImage,
  AccountancyVectorImage,
  StatisticsVectorImage,
  ComputerScienceVectorImage,
  SpaceScienceVectorImage,
} from "../Assets/vectorimages/source";
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

const SubjectContainer = Styled.div`
   display: grid;
   grid-gap: 25px;
   grid-template-columns: repeat(4, minmax(0,1fr));
   background: white;
   margin-top: 20px;
   margin-bottom: 20px;
`;

const Subject = Styled.div`
   display: flex;
   flex-direction: column;
   color: black;
   img{
     width: 140px;
     height: 140px;
   }
   width: 185px;
   height: 205px;
   background-color: rgba(77, 213, 153, 0.4);
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 20px;
   align-items: center;
   border: 1px solid rgba(77, 213, 153, 0.4);
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

const Classes = () => {
  const { subject } = useParams();

  return (
    <>
      <Breadcrumbs pages={["Attendance", subject]} />
    </>
  );
};

const Attendance = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(ClearServer());
  }, []);

  const { subject } = useParams();

  return (
    <Container>
      <Content>
        <Router>
          <Switch>
            <Route path="/attendance/:subject" children={<Classes />} />
            <Route path="/attendance/">
              <Breadcrumbs pages={["Attendance"]} />
              <SubjectContainer>
                <Link to="/attendance/Tamil">
                  <Subject>
                    <TamilPongalVectorImage width={150} height={150} />
                    <h3>Tamil</h3>
                  </Subject>
                </Link>
                <Subject>
                  <EnglishStatueofLibertyVectorImage width={150} height={150} />
                  <h3>English</h3>
                </Subject>
                <Subject>
                  <MathemeticsVectorImage width={150} height={150} />
                  <h3>Maths</h3>
                </Subject>
                <Subject>
                  <ScienceVectorImage width={150} height={150} />
                  <h3>Science</h3>
                </Subject>
                <Subject>
                  <SocialScienceVectorImage width={150} height={150} />
                  <h3>Social Science</h3>
                </Subject>
                <Subject>
                  <HistoryVectorImage width={150} height={150} />
                  <h3>History</h3>
                </Subject>
                <Subject>
                  <BiologyVectorImage width={150} height={150} />
                  <h3>Biology</h3>
                </Subject>
                <Subject>
                  <AccountancyVectorImage width={150} height={150} />
                  <h3>Accountancy</h3>
                </Subject>
                <Subject>
                  <StatisticsVectorImage width={150} height={150} />
                  <h3>Statistics</h3>
                </Subject>
                <Subject>
                  <ComputerScienceVectorImage width={150} height={150} />
                  <h3>Computer Science</h3>
                </Subject>
                <Subject>
                  <SpaceScienceVectorImage width={150} height={150} />
                  <h3>Space Science</h3>
                </Subject>
              </SubjectContainer>
              <StudentsContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Department</th>
                      <th>Mobile</th>
                      <th>OverAll Period</th>
                      <th>OverAll Precent</th>
                      <th>OverAll Absent</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>
                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>
                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>
                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>

                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>
                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>

                    <tr>
                      <td>Moganesan</td>
                      <td>Commerce</td>
                      <td>Pending</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                      <td>adsdno</td>
                    </tr>
                  </tbody>
                </Table>
              </StudentsContainer>
            </Route>
          </Switch>
        </Router>
      </Content>
    </Container>
  );
};

export default Attendance;
