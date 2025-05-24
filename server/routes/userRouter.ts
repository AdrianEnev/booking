import getIsUserAdmin from '@services/users/getIsUserAdmin';
import getUserInfo from '@services/users/getUserInfo';
import setUserAdmin from '@services/users/setUserAdmin';
import validateUserId from '@services/users/validateUserId';
import express from 'express';
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {});

userRouter.get('/:userId', async (req, res) => {

    const userId: string = req.params.userId;
    await validateUserId(userId);

    const userInfo = await getUserInfo(userId);
    res.status(200).json(userInfo);

});

userRouter.get('/:userId/admin', async (req, res) => {

    const userId: string = req.params.userId;
    await validateUserId(userId);

    const isUserAdmin = await getIsUserAdmin(userId);
    res.status(200).json({ isAdmin: isUserAdmin });

});

// Change user "isAdmin" custom claims in firebase
userRouter.put('/:userId/admin', async (req, res) => {

    const userId: string = req.params.userId;
    await validateUserId(userId);

    const { isAdmin } = req.body;

    setUserAdmin(userId, isAdmin);
    res.status(204).send();

});

export default userRouter;