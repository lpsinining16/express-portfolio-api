import { Router } from 'express';
import wrap from '../utils/responseWrapper.js';
import WorkExperience from '../models/workExperience.model.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const workExperience = await WorkExperience.find();
    res.status(200).json(wrap(workExperience));
  } catch (err) {
    next(err);
  }
});

export default router;

