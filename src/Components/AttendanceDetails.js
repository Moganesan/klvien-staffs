import { useEffect, useState } from "react";
import Styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { UIActionTypes } from "../Store/constants/actionTypes";
import {
  CloseAttendanceDetailsModal,
  CloseFeedbackModal,
} from "../Store/actions/uiActions";
import Close from "../Assets/close.svg";
import { motion } from "framer-motion";
import { ButtonPrimary } from "../Components/Button";
import { useToasts } from "react-toast-notifications";
import { addFeedback } from "../Store/reducers/serverReducer";
import AttendancePie from "./AttendancePie";
import AttendanceChart from "./AttendanceChart";

const Container = Styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 1;
   display: flex;   
   align-items: center;
   justify-content: center;
`;

const Background = Styled.div`
   background: rgb(0, 0, 0,0.3);
   width: 100%;
   height: 100%;
   position: absolute;
`;

const Content = Styled.div`
   width: 50%;
   height: 90%;
   background-color: #fff;
   z-index: 2;
   position: absolute;
   border-radius: 30px;
   padding: 20px;   
   h3{
       margin: 0;   
       padding: 0;
   }
   @media only screen and (max-width:425px){
       width: 85%;
   }
`;

const Header = Styled.div`
   display: flex;
   justify-content: flex-end;
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
   height: 340px;
   overflow: scroll;
`;

const AttendanceDetails = () => {
  const active = useSelector((state) => state.AttendanceDetailsModal.status);
  const Name = useSelector((state) => state.SetUser.user.staff.fname);
  const Email = useSelector((state) => state.SetUser.user.staff.email);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  return (
    <>
      {active === UIActionTypes.OPEN_ATTENDANCE_DETAILS_MODAL ? (
        <Container>
          <Background onClick={() => dispatch(CloseAttendanceDetailsModal())} />
          <Content>
            <Header>
              <motion.div
                style={{ cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(CloseAttendanceDetailsModal())}
              >
                <img style={{ width: 20 }} src={Close} />
              </motion.div>
            </Header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <AttendancePie
                data={[
                  {
                    id: "Overall Attendance",
                    label: "Precent",
                    value: 100,
                    color: "hsl(249, 70%, 50%)",
                  },
                  {
                    id: "Absent",
                    label: "Absent",
                    value: 100,
                    color: "hsl(102, 70%, 50%)",
                  },
                ]}
              />
              <AttendanceChart data={data} />
            </div>
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
      ) : null}
    </>
  );
};

const data = [
  {
    subjects: "TAM",
    Tamil: 13,
  },
  {
    subjects: "ENG",
    English: 10,
  },
  {
    subjects: "MAT",
    Maths: 10,
  },
  {
    subjects: "SCI",
    Science: 51,
  },
  {
    subjects: "PHY",
    Physics: 127,
  },
  {
    subjects: "CHE",
    Chemistery: 57,
  },
];

export default AttendanceDetails;
