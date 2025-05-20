import checkUsernameNSFW from '@services/models/checkUsernameNSFW';
import express from 'express';
const modelsRouter = express.Router();

modelsRouter.get('/', async (req, res) => {
    
});

modelsRouter.get('/checkUsernameNSFW/:username', async (req, res) => {

    const username = req.params.username;

    const isUsernameNSFW = await checkUsernameNSFW(username);
    res.json({ isUsernameNSFW });

});

export default modelsRouter;