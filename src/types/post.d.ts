export type StoryType = {
  author: string;
  picUrl: string;
};

export type CommentType = {
  authorName: string;
  authorID: string;
  authorPicture: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostImage = {
  id: string;
  url: string;
  fileId: string;
  order: number;
};

export type PostType = {
  id: string;
  author: {
    firstName: string;
    surname: string;
    profilePicUrl: string;
    username: string;
  };
  authorId: string;
  picUrls?: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  commentCount: number;
  likes?: number;
  images?: PostImage[];
};

export type PostStatus = "Private" | "Public" | "Draft" | "FriendOnly";
