import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/statuscodeError';
import { paginationHelpers } from '../../../reusableFunctions/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { serviceSearchableFields } from './subject.constant';
import { IService, IServiceFilters } from './subject.interface';
import { Service } from './subject.model';

const createService = async (payload: IService) => {
  const result = (await Service.create(payload)).populate('instructorId');

  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const isExist = await Service.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getSingleService = async (id: string): Promise<IService | null> => {
  const result = await Service.findById(id).populate('instructorId');

  return result;
};

const deleteService = async (id: string): Promise<IService | null> => {
  const isExist = await Service.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const result = await Service.findByIdAndDelete(id);

  return result;
};

const getAllService = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const {
    searchTerm,
    rating: ratingData,
    isAvailable,
    level,
    ...filtersData
  } = filters;

  const andConditions = [];

  // if (minPrice) {
  //   andConditions.push({
  //     price: {
  //       $gte: parseFloat(minPrice.toString()),
  //     },
  //   });
  // }

  // if (maxPrice) {
  //   andConditions.push({
  //     price: {
  //       $lte: parseFloat(maxPrice.toString()),
  //     },
  //   });
  // }

  if (level) {
    andConditions.push({
      level: level,
    });
  }

  if (ratingData) {
    const minRating = parseFloat(ratingData.toString());
    const maxRating = minRating + 1;
    andConditions.push({
      $and: [{ rating: { $gte: minRating } }, { rating: { $lt: maxRating } }],
    });
  }

  //  partial match
  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (isAvailable !== undefined) {
    andConditions.push({
      isAvailable: isAvailable,
    });
  }


  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    if (sortOrder === 'asc' || sortOrder === 'desc') {
      sortConditions[sortBy] = sortOrder as SortOrder;
    }
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .populate('instructorId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ServiceServices = {
  createService,
  updateService,
  getSingleService,
  deleteService,
  getAllService,
};
