import axios from "axios";
import { API } from "../constants/api";
import { ServerActionTypes } from "../constants/actionTypes";
import {
  GetAttendance,
  GetAssignment,
  GetExams,
  GetHolidays,
  GetClasses,
  ClearServer,
  GetBillings,
  GetSubjects,
  GetStudents,
} from "../actions/serverActions";
import {
  SetLoadingFalse,
  SetLoadinTrue,
  SetErrorMessage,
  SetInfoMessage,
  SetSuccessMessage,
  SetRocketLoadingTrue,
  SetRocketLoadingFalse,
} from "../actions/uiActions";

const database = {
  students: [],
  subjects: [],
  attendance: [],
  assignments: [],
  exams: [],
  holidays: [],
  classes: [],
  billings: [],
};

const get_students = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/students`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: DepId,
      SemId: SemId,
    },
  })
    .then((res) => {
      return dispatch(GetStudents(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const get_subjects = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/subjects`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: DepId,
      SemId: SemId,
    },
  })
    .then((res) => {
      return dispatch(GetSubjects(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const get_attendance = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  if (InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/staff/students/attendance`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(GetAttendance(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => dispatch(SetErrorMessage(err)));
  }
};

const getAssignment = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/assignments`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: DepId,
      SemId: SemId,
    },
  })
    .then((res) => {
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(
          SetInfoMessage({ code: "404", message: "No assignments found!" })
        );
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetAssignment(res.data.data));
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const getExams = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/exams`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: DepId,
      SemId: SemId,
    },
  })
    .then((res) => {
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(SetInfoMessage({ code: "404", message: "No exams found!" }));
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetExams(res.data.data));
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const getHolidays = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/holidays`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          dispatch(ClearServer());
          dispatch(
            SetInfoMessage({ code: "404", message: "No holidays found!" })
          );
          return dispatch(SetLoadingFalse());
        }
        dispatch(GetHolidays(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => dispatch(SetErrorMessage(err)));
  }
};

const getClasses = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/classes`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: DepId,
      SemId: SemId,
    },
  })
    .then((res) => {
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(SetInfoMessage({ code: "404", message: "No classes found!" }));
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetClasses(res.data.data));
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => {
      dispatch(SetErrorMessage(err));
    });
};

const UpdateStudent =
  (InId, DepId, SemId, StudId, Data) => async (dispatch, getstate) => {
    dispatch(SetRocketLoadingTrue());
    const Student = getstate().Server["students"].map((stud) =>
      stud.StudId === StudId ? stud : null
    );

    if (StudId && Data.length && Student.length) {
      await axios({
        method: "POST",
        url: `${API}/staff/student/update`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          InId: InId,
          DepId: DepId,
          SemId: SemId,
          StudId: StudId,
          Data: Data,
        },
      })
        .then(async (res) => {
          dispatch(SetRocketLoadingFalse());
          dispatch(ClearServer());
          dispatch(get_students(Student[0].DepId, Student[0].SemId));
          await dispatch(
            SetSuccessMessage({
              code: 200,
              message: "Student Details Updated!",
            })
          );
        })
        .catch((err) => {
          dispatch(SetRocketLoadingFalse());
          dispatch(SetErrorMessage(err));
        });
    }
  };

const CreateStudent = (formdata) => async (dispatch, getstate) => {
  dispatch(SetRocketLoadingTrue());
  await axios({
    method: "POST",
    url: `${API}/staff/student/create`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: formdata,
  })
    .then((res) => {
      dispatch(SetRocketLoadingFalse());
      dispatch(SetSuccessMessage(res.data));
    })
    .catch((err) => {
      dispatch(SetRocketLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const addAttendance = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  const SubId = getstate().Server["classes"].subId;
  const ClsId = getstate().Server["classes"]._id;
  const meetingURL = getstate().Server["classes"].meeting.join_url;
  if (StudId && InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/attendance/add`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
        SubId: SubId,
        ClsId: ClsId,
      },
    })
      .then(async (res) => {
        dispatch(SetLoadingFalse());
        await dispatch(
          SetSuccessMessage({ code: 200, message: "Attendance Recorded" })
        );
        setTimeout(() => {
          window.open(meetingURL.toString().trim(), "_blank").focus();
        }, 500);
      })
      .catch((err) => {
        dispatch(SetLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  }
};

const getBillings = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (StudId && InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/billings`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          dispatch(ClearServer());
          dispatch(
            SetInfoMessage({ code: "404", message: "No Payments found!" })
          );
          return dispatch(SetLoadingFalse());
        }
        dispatch(GetBillings(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => {
        dispatch(SetErrorMessage(err));
      });
  }
};

const addFeedback = (message) => async (dispatch, getstate) => {
  dispatch(SetRocketLoadingTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  const Name = getstate().SetUser.user.student.fname;
  const Email = getstate().SetUser.user.student.email;
  const Message = message;

  if (StudId && InId && SemId && DepId && Name && Email && Message) {
    await axios({
      method: "POST",
      url: `${API}/student/feedback/add`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
        Name: Name,
        Email: Email,
        Message: Message,
      },
    })
      .then(async (res) => {
        dispatch(SetRocketLoadingFalse());
        await dispatch(
          SetSuccessMessage({
            code: 200,
            message: "Thank you for your support!",
          })
        );
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  } else {
    dispatch(SetRocketLoadingFalse());
    dispatch(SetInfoMessage({ code: 200, message: "no message found!" }));
  }
};

const serverReducer = (state = database, { type, payload }) => {
  switch (type) {
    case ServerActionTypes.GET_STUDENTS:
      return {
        ...state,
        students: payload,
      };
    case ServerActionTypes.GET_SUBJECTS:
      return {
        ...state,
        subjects: payload,
      };
    case ServerActionTypes.GET_ATTENDANCE:
      return {
        ...state,
        attendance: payload,
      };
    case ServerActionTypes.GET_ASSIGNMENT:
      return {
        ...state,
        assignments: payload,
      };
    case ServerActionTypes.GET_EXAMS:
      return {
        ...state,
        exams: payload,
      };
    case ServerActionTypes.GET_HOLIDAYS:
      return {
        ...state,
        holidays: payload,
      };
    case ServerActionTypes.GET_CLASSES:
      return {
        ...state,
        classes: payload,
      };
    case ServerActionTypes.GET_BILLINGS:
      return {
        ...state,
        billings: payload,
      };
    case ServerActionTypes.CLEAR_SERVER:
      return {
        students: [],
        subjects: [],
        attendance: [],
        assignments: [],
        exams: [],
        holidays: [],
        classes: [],
        billings: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export {
  get_students,
  CreateStudent,
  UpdateStudent,
  get_subjects,
  get_attendance,
  getAssignment,
  getExams,
  getHolidays,
  getClasses,
  getBillings,
  addAttendance,
  addFeedback,
  serverReducer,
};
