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
    profilePicUrl: {
      pictureUrl: string;
    };
    username: string;
  };
  authorId: string;
  picUrls?: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  commentCount: number;
  like: [];
  images?: PostImage[];
  hostPostId?: string;
  status: PostStatus;
};

export type PostStatus = "Private" | "Public" | "Draft" | "FriendOnly";
