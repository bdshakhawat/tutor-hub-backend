import express from 'express';
import { TutorController } from './tutor.controller';

const router = express.Router();

router.post('/create-tutor', TutorController.createTutor);

router.patch('/tutor-status-change/:id', TutorController.tutorStatusChange);

export const TutorRoute = router;
