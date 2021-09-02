import { useEffect, useState } from "react";
import Styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../Components/breadcrumbs";
import { ButtonPrimary } from "../Components/Button";
import { Camera, Pencil } from "../Assets/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { API, GET_PROFILE } from "../Store/constants/api";
import {
  SetErrorMessage,
  SetLoadingFalse,
  SetLoadinTrue,
  SetSuccessMessage,
} from "../Store/actions/uiActions";
import { ClearServer } from "../Store/actions/serverActions";
import { get_students } from "../Store/reducers/serverReducer";

const Header = Styled.div`
   select{
     border: none;
     outline: none;
     padding: 10px;
     border-radius: 5px;
     font-weight: bold;
     color: white;
     background-color: #0D7377;
     margin-right: 10px;
   }
`;

const StudentDetailsContainer = Styled.div`
   display: flex;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   border-radius: 30px;
   margin-top: 20px;
`;

const CameraIcon = Styled(motion.div)`
   position: absolute;
   display: none;
   input[type=file] {
    display: none;
  }
`;

const StudentProfileContainer = Styled.div`
   width: 200px;
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: hidden;
   &:hover{
     ${CameraIcon}{
      display: block;
     }
   }
`;

const StudentProfile = Styled.div`
   width: 150px;
   height: 150px;
   border-radius: 10%;
   overflow: hidden;

   img{
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
`;

const Form = Styled.div`
   display: flex;   
   flex-direction: column;
   justify-content: space-evenly;
   padding: 20px 0;
   width: 90%;
   h4{
     margin: 0;
     margin-bottom: 10px;
   }
   input{
     outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
   }
   input:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   textarea{
    outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
     height: 100PX;
     padding: 10px;
     resize: vertical;
   }
   textarea:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  input[type=number] {
    -moz-appearance: textfield;
  }
 
`;

const Label = Styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 0 10px;
`;

const FormGrid = Styled.div`
   display: grid;
   grid-gap: 5px;
   grid-template-columns: repeat(3, minmax(0,1fr));
`;

const StudentDetails = () => {
  const dispatch = useDispatch();

  const { studId } = useParams();
  const history = useHistory();

  const departments = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );
  const semesters = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  const Student = useSelector((state) =>
    state.Server["students"].map((stud) => {
      if (stud.StudId === studId) {
        return stud;
      }
    })
  );

  const [fileServer, setFileServer] = useState(false);
  const [fileName, setFileName] = useState("");
  const [serverState, setServerState] = useState(0);

  const Upload = (e) => {
    if (e.target.files.length) {
      setFileServer(true);
      dispatch(SetLoadinTrue());
      const file = e.target.files[0];
      const fileName = e.target.files[0].name;
      setFileName(fileName);
      const formData = new FormData();
      formData.append("name", fileName);
      formData.append("file", file);
      formData.append("StudId", Student[0].StudId);
      formData.append("InId", Student[0].InId);
      axios({
        url: `${API}/staff/student/uplodprofile`,
        method: "post",
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setServerState(percentage);
        },
        data: formData,
      })
        .then((res) => {
          dispatch(ClearServer());
          dispatch(get_students(departments[0]._id, semesters[0]._id));
          dispatch(SetLoadingFalse());
          dispatch(
            SetSuccessMessage({
              message: "Profile Updated!",
            })
          );
        })
        .catch((err) => {
          dispatch(SetLoadingFalse());
          dispatch(SetErrorMessage(err));
        });
    }
  };

  useEffect(() => {
    // if (!Student.length) {
    //   window.location.replace("/students");
    //   console.log("push");
    // }
  }, []);

  return (
    <>
      {Student.length ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Breadcrumbs pages={["students", "studentsDetails"]} />
            <Header></Header>
          </div>

          <StudentDetailsContainer>
            <StudentProfileContainer>
              <StudentProfile>
                <img src={GET_PROFILE + Student[0].profile} />
              </StudentProfile>

              <CameraIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <input
                  accept="image/png, image/jpeg"
                  id="file"
                  type="file"
                  onChange={(e) => {
                    Upload(e);
                  }}
                />
                <label for="file">
                  <Camera />
                </label>
              </CameraIcon>
            </StudentProfileContainer>

            <Form>
              <div style={{ display: "flex" }}>
                <h4>Student Details</h4>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {}}
                >
                  <Pencil width={20} height={20} />
                </motion.div>
              </div>
              <FormGrid>
                <div>
                  <label>Name</label>
                  <input type="text" value={Student[0].name} disabled />
                </div>
                <div>
                  <label>Email</label>
                  <input type="text" value={Student[0].email} disabled />
                </div>
                <div>
                  <label>Gender</label>

                  <input type="text" value={Student[0].sex} disabled />
                </div>
                <div>
                  <label>Blood Group</label>
                  <input type="text" value={Student[0].bloodGroup} disabled />
                </div>
                <div>
                  <label>Mobile</label>

                  <input type="text" value={Student[0].contMob} disabled />
                </div>
                <div>
                  <label>Age</label>

                  <input type="text" value={Student[0].age} disabled />
                </div>
                <div>
                  <label>Title</label>

                  <input type="text" value={Student[0].title} disabled />
                </div>
                <div>
                  <label>Qualification</label>
                  <input
                    type="text"
                    value={Student[0].qualification}
                    disabled
                  />
                </div>
                <div>
                  <label>DOB</label>
                  <input type="text" value={Student[0].dob} disabled />
                </div>
                <div>
                  <label>Community</label>
                  <input type="text" value={Student[0].community} disabled />
                </div>
                <div>
                  <label>Country</label>
                  <input type="text" value={Student[0].country} disabled />
                </div>
                <div>
                  <label>State</label>

                  <input type="text" value={Student[0].state} disabled />
                </div>
                <div>
                  <label>District</label>

                  <input type="text" value={Student[0].district} disabled />
                </div>
                <div>
                  <label>Pincode</label>
                  <input type="text" value={Student[0].pincode} disabled />
                </div>
                <div>
                  <label>Father Name</label>

                  <input type="text" value={Student[0].fathName} disabled />
                </div>
                <div>
                  <label>Father Occupation</label>
                  <input type="text" value={Student[0].fathOccu} disabled />
                </div>
                <div>
                  <label>Father Mobile</label>

                  <input type="text" value={Student[0].fathMob} disabled />
                </div>
                <div>
                  <label>Mother Name</label>
                  <input type="text" value={Student[0].mothName} disabled />
                </div>
                <div>
                  <label>Mother Occupation</label>
                  <input type="text" value={Student[0].mothOccu} disabled />
                </div>
                <div>
                  <label>Mother Mobile</label>
                  <input type="text" value={Student[0].mothMob} disabled />
                </div>
                <div>
                  <label>Admission No</label>
                  <input type="text" value={Student[0].addmisNo} disabled />
                </div>
                <div>
                  <label>Department</label>
                  <input type="text" value={Student[0].depName} disabled />
                </div>
                <div>
                  <label>Semester</label>
                  <input type="text" value={Student[0].semName} disabled />
                </div>
              </FormGrid>
            </Form>
          </StudentDetailsContainer>
        </>
      ) : null}
    </>
  );
};

export default StudentDetails;
