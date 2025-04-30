// tutor.controller.ts
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { TutorService } from './tutor.service';

const createTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.createTutor(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutor profile created successfully!',
      data: result,
    });
  }
);

const tutorStatusChange: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.tutorStatusChange(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutor status updated successfully!',
      data: result,
    });
  }
);

const getAllTutors: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.getAllTutors();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutors retrieved successfully',
      data: result,
    });
  }
);
const getSingleTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
        const id = req.params.id;

    const result = await TutorService.getSingleTutor(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutor retrieved successfully',
      data: result,
    });
  }
);

const searchTutors: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    const result = await TutorService.searchTutors(searchTerm as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutors retrieved successfully',
      data: result,
    });
  }
);

export const TutorController = {
  createTutor,
  tutorStatusChange,
  getAllTutors,
  searchTutors,
  getSingleTutor,
};





// import { Request, RequestHandler, Response } from 'express';
// import httpStatus from 'http-status';
// import catchAsync from '../../../utils/catchAsync';
// import sendResponse from '../../../utils/sendResponse';
// import { TutorService } from './tutor.service';

// const createTutor: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await TutorService.createTutor(req.body);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User updated successfully!',
//       data: result,
//     });
//   }
// );

// const tutorStatusChange: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await TutorService.tutorStatusChange(
//       req.params.id,
//       req.body.status
//     );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User updated successfully!',
//       data: result,
//     });
//   }
// );

// export const TutorController = {
//   createTutor,
//   tutorStatusChange,
// };
