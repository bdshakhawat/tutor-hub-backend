import { Schema, model, Document } from 'mongoose';
import { ITutorProfile } from './tutors.interface';

// Using type instead of interface
type TutorDocument = ITutorProfile & Document;

const tutorsSchema = new Schema<TutorDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    hourlyRate: {
      type: Number,
    },
    education: {
      type: [String],
      default: [],
    },
    teachingMethods: {
      type: String,
    },
    availability: {
      type: [String],
      default: [],
    },
    qualifications: {
      type: [{
        degree: String,
        institution: String,
        year: Number
      }],
      default: []
    },
    languages: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Tutor = model<TutorDocument>('Tutor', tutorsSchema);

// import { Schema, model } from 'mongoose';
// import { ITutorProfile } from './tutors.interface';
// interface ITutorDocument extends ITutorProfile, Document {}
// const tutorsSchema = new Schema<ITutorProfile>(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     experience: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'accepted', 'rejected'],
//       default: 'pending',
//     },
  
//    hourlyRate: {
//       type: Number,
//     },
//     education: {
//       type: [String],
//       default: [],
//     },
//     teachingMethods: {
//       type: String,
//     },
//     availability: {
//       type: [String],
//       default: [],
//     },
//     qualifications: {
//       type: [{
//         degree: String,
//         institution: String,
//         year: Number
//       }],
//       default: []
//     },
//     languages: {
//       type: [String],
//       default: []
//     },
  
  
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// export const Tutor = model<ITutorProfile>('Tutor', tutorsSchema);
