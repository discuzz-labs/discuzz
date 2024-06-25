// Issue Type
export type Issue = {
  id: string;
  label: string;
  assignees: string;
  date: Date;
  comments: number;
  status: string;
  edited: boolean;
  title: string;
  body: string;
  user: User; // Assuming a User type is defined
  userId: string;
};

// Report Type
export type Report = {
  id: string;
  user: User; // Assuming a User type is defined
  reason: string;
  date: Date;
  level: number; // from 1 to 5
  accepted: boolean;
  userId: string;
};

// Follower Type
export type Follower = {
  id: string;
  user: User; // Assuming a User type is defined
  userId: string;
};

// Follow Type
export type Follow = {
  id: string;
  user: User; // Assuming a User type is defined
  userId: string;
};

// User Type
export type User = {
  id: string;
  email: string;
  name: string;
  imageURL: string;
  age: number;
  type: string;
  bio: string;
  badges: string[];
  likes: bigint;
  links: string[];
  reports: Report[];
  follower: Follower[];
  follow: Follow[];
  posts: Issue[];
};
