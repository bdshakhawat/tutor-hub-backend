import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../paging/pagination';
import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/selectedPick';
import sendResponse from '../../../utils/sendResponse';
import { serviceFilterableFields } from './subject.constant';
import { IService } from './subject.interface';
import { ServiceServices } from './subject.service';

const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    // console.log(data);

    const result = await ServiceServices.createService(data);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service created successfully!',
      data: result,
    });
  }
);

const updateService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await ServiceServices.updateService(id, data);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service updated successfully!',
      data: result,
    });
  }
);

const getSingleService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ServiceServices.getSingleService(id);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service fetched successfully!',
      data: result,
    });
  }
);

const deleteService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ServiceServices.deleteService(id);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service deleted successfully!',
      data: result,
    });
  }
);

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceServices.getAllService(
    filters,
    paginationOptions
  );

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const ServiceControllers = {
  createService,
  updateService,
  getSingleService,
  deleteService,
  getAllService,
};
