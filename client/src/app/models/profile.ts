export interface Profile {
  username: string;
  appUserId: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
  following: boolean;
  followerCount: number;
  followingCount: number;
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}
