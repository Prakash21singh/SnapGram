export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type IProfileUser = {
  $id: string;
  imageUrl: string;
  username: string;
  name: string;
};

export type IMessage = {
  chatId: string;
  senderId: string;
  message: string;
};

export type ICreatedMessage = {
  $id: string;
  message: string;
  senderId: {
    $id: string;
  };
};
