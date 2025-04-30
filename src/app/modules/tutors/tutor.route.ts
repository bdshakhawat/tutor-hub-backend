// tutor.route.ts
import express from 'express';
import { TutorController } from './tutor.controller';

const router = express.Router();

router.post('/create-tutor', TutorController.createTutor);
router.patch('/change-tutor-status/:id', TutorController.tutorStatusChange);
router.get('/', TutorController.getAllTutors); // Add this new route
router.get('/search', TutorController.searchTutors); // Add search route
// Get single tutor by ID
router.get(
  '/:id', TutorController.getSingleTutor);
export const TutorsRoute = router;










// import express from 'express';
// import { TutorController } from './tutor.controller';

// const router = express.Router();

// router.post('/create-tutor', TutorController.createTutor);

// router.patch('/change-tutor-status/:id', TutorController.tutorStatusChange);

// export const TutorsRoute = router;
