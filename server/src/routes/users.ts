import express, {Router} from "express";
import UserInfo from "../../../shared/models/UserInfo";
import dataAccess from "../data/DataAccess";

export const router: Router = express.Router();

type UserSaveRequest = {
    body: {
        user: UserInfo;
    }
};
router.post('/users/save', async (req: UserSaveRequest, res) => {
    await dataAccess.users.save(req.body.user);

    res.status(204).send();
});
