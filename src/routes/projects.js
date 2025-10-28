import { Router } from 'express';
import { param, body, validationResult } from 'express-validator';
import wrap, { wrapError } from '../utils/responseWrapper.js';
import Project from '../models/project.model.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(wrap(projects));
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid project ID format')],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(wrapError('Validation failed', errors.array()));
    }

    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json(wrapError('Project not found'));
      }
      res.status(200).json(wrap(project));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('type').isIn(['professional', 'personal']).withMessage('Invalid project type'),
    body('description').notEmpty().withMessage('Description is required'),
    body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(wrapError('Validation failed', errors.array()));
    }

    try {
      const newProject = new Project(req.body);
      const savedProject = await newProject.save();
      res.status(201).json(wrap(savedProject, 'Project created successfully'));
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid project ID format'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('type')
      .optional()
      .isIn(['professional', 'personal'])
      .withMessage('Invalid project type'),
    body('technologies')
      .optional()
      .isArray({ min: 1 })
      .withMessage('At least one technology is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(wrapError('Validation failed', errors.array()));
    }

    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      });

      if (!updatedProject) {
        return res.status(404).json(wrapError('Project not found'));
      }

      res.status(200).json(wrap(updatedProject, 'Project updated successfully'));
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid project ID format')],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(wrapError('Validation failed', errors.array()));
    }

    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);

      if (!deletedProject) {
        return res.status(4404).json(wrapError('Project not found'));
      }

      res.status(204).send(); // No content
    } catch (err) {
      next(err);
    }
  }
);

export default router;

