import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ITutorProfile } from './tutors.interface';
import { Tutor } from './tutors.model';

const createTutor = async (data: ITutorProfile): Promise<ITutorProfile> => {
  const { userId } = data;
  const isTutorIxist = await Tutor.findById(userId);
  if (isTutorIxist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already have a tutor profile'
    );
  }

  const result = (await Tutor.create(data)).populate('userId');

  return result;
};

const tutorStatusChange = async (
  id: string,
  status: string
): Promise<ITutorProfile | null> => {
  if (status === 'accepted') {
    const result = await Tutor.findByIdAndUpdate(id, { status: 'accepted' });
    return result;
  }
  const result = await Tutor.findByIdAndDelete(id);
  return result;
};

const getAllTutors = async () => {
  const result = await Tutor.find().populate('userId');
  return result;
};

export const TutorService = {
  createTutor,
  tutorStatusChange,
  getAllTutors,
};
