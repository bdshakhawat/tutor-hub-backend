

export type IUserProfile = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'tutor' | 'admin' | 'super_admin';
  
  profileImgUrl?: string;
  phonenumber: string;
};
