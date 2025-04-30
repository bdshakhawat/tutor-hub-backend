import httpStatus from 'http-status';
import ApiError from '../../../errors/statuscodeError';
import { ITutorProfile } from './tutors.interface';
import { Tutor } from './tutors.model';

const createTutor = async (data: ITutorProfile): Promise<ITutorProfile> => {
  const { userId } = data;
  const isTutorExist = await Tutor.findOne({ userId });
  if (isTutorExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already have a tutor profile'
    );
  }

  const result = await Tutor.create(data);
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
  const result = await Tutor.find({ status: 'accepted' }).populate('userId');
  return result;
};
const getSingleTutor = async (id: string) => {
  const result = await Tutor.findById(id).populate('userId');
  return result;
};
const searchTutors = async (searchTerm: string) => {
  // Validate search term exists
  if (!searchTerm || searchTerm.trim().length < 2) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Search term must be at least 2 characters'
    );
  }

  // Check if search term is numeric
  const experienceValue = Number(searchTerm);
  const isNumericSearch = !isNaN(experienceValue);

  // Define all possible search conditions
  const textSearchConditions = [
    { subject: { $regex: searchTerm, $options: 'i' } },
    { address: { $regex: searchTerm, $options: 'i' } },
    { 'userId.name': { $regex: searchTerm, $options: 'i' } },
  ];

  // Build the complete query
  const query: {
    status: string;
    $or: Array<
      | { subject: { $regex: string; $options: string } }
      | { address: { $regex: string; $options: string } }
      | { 'userId.name': { $regex: string; $options: string } }
      | { experience: number }
    >;
  } = {
    status: 'accepted',
    $or: [...textSearchConditions],
  };

  // Add numeric condition if applicable
  if (isNumericSearch) {
    query.$or.push({ experience: experienceValue });
  }

  // Execute the query
  const result = await Tutor.find(query).populate('userId');
  return result;
};

export const TutorService = {
  createTutor,
  tutorStatusChange,
  getAllTutors,
  searchTutors,
  getSingleTutor,
};


