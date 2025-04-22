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

export type PostType = {
  authorName: string;
  authorID: string;
  authorPicture: string;
  picUrls?: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments?: CommentType[];
  likes?: number;
};
