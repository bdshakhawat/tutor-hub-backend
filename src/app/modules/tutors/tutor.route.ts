import express from 'express';
import { TutorController } from './tutor.controller';

const router = express.Router();

router.post('/create-tutor', TutorController.createTutor);

router.patch('/change-tutor-status/:id', TutorController.tutorStatusChange);

export const TutorsRoute = router;
