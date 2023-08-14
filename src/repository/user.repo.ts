import BaseDAL from "./DAL";
import { IUser } from "../models/user.model";

class UserDAL extends BaseDAL<IUser> {}

export default UserDAL;
