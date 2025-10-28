import { Router } from 'express';
import wrap from '../utils/responseWrapper.js';
import NavLink from '../models/navLink.model.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const navLinks = await NavLink.find();
    res.status(200).json(wrap(navLinks));
  } catch (err) {
    next(err);
  }
});

export default router;

