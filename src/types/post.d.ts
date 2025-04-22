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
  id: string;
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
