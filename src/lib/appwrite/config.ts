import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appWriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  saveCollectionId: import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
};

export const client = new Client();
client.setProject(appWriteConfig.projectId);
client.setEndpoint(appWriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
