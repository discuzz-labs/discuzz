import { Role, ActivityBadge, Level, Issuestatus } from "@prisma/client";

// Model definitions
export type Issue = {
  id: number;
  author: User;
  userId: number;
  label: string;
  level: Level;
  creation_date: Date;
  update_date: Date;
  comments: number;
  issue_status: Issuestatus;
  title: string;
  body: string;
  issue_contributer: string[]; // This will be a JSON string containing the id and the name of the user. Because MongoDB does not support many-to-many relationships natively.
};

export type UserReport = {
  id: number;
  author: User;
  userId: number;
  label: string;
  moderity: number;
  body: string;
  creation_date: Date;
  accepted: boolean;
  seen: boolean;
};

export type User = {
  id: string,
  email: string;
  password: String;
  fullName: string;
  imageURL: string;
  age: number;
  role: Role;
  bio: string;
  badges: ActivityBadge[];
  level: Level;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  TFA: boolean;
  OTP: string;
  TTL: string;
  links: string[];
  reports: Report[];
  issues: Issue[];
  followerIds: number[];
  followingIds: number[];
};
