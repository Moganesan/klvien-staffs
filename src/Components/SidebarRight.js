import Styled from "styled-components";
import { ButtonPrimary, ButtonScondary } from "./Button";
import { LogoutIcon } from "../Assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { OpenProfileModal } from "../Store/actions/uiActions";
import { motion } from "framer-motion";
import { Logout } from "../Store/reducers/userReducer";

const Container = Styled.div`
   position: fixed;
   width: 300px;
   height: calc(100vh - 70px);
   background: white;
   left: calc(100vw - 300px);
   box-shadow: -2px 10px 10px rgba(0, 0, 0, 0.07);
   display: flex;
   flex-direction: column;
   @media only screen and (max-width: 1024px) {
      display: none;
   }
   h2{
     margin-left: 20px;
   }
`;
const User = Styled.div`
  height: 60px;
  background-color: #EEEEEE;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;  
`;

const Profile = Styled.div`
   width: 50px;
   height: 50px;
   img{
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.SetUser.user.staff);
  return (
    <Container>
      <h2>Recent Logins</h2>
      <User>
        <Profile>
          <img
            src={
              "https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
            }
          />
        </Profile>
        <h4>Moganesan</h4>
        <span>10 min ago</span>
      </User>
    </Container>
  );
};

export default Sidebar;
