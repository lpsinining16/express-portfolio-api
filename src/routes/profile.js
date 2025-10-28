import { Router } from 'express';
import wrap, { wrapError } from '../utils/responseWrapper.js';
import Profile from '../models/profile.model.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    // Find the first profile document. Since it's a portfolio, there's only one.
    const profile = await Profile.findOne();
    if (!profile) {
      // Use the named 'wrapError' import
      return res.status(404).json(wrapError('Profile not found'));
    }
    // Use the default 'wrap' import
    res.status(200).json(wrap(profile));
  } catch (err) {
    next(err); // Pass error to global handler
  }
});

export default router;

