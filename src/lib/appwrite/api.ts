import {
  INewPost,
  INewUser,
  IProfileUser,
  IUpdatePost,
  IUpdateUser,
} from "@/types";
import { account, appWriteConfig, avatars, databases, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    // CREATING THE ACCOUNT
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    //GETTING THE DEFAULT AVATAR OF USER
    const avatarUrl = avatars.getInitials(user.name);

    //SAVING THE USER TO THE DATABASE
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//SAVE USER TO THE DATABASE
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//SIGN USER BY CREATING SESSION BY EMAIL AND PASS
export async function SignInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//SIGN OUT USER
export async function SignOutAccount() {
  try {
    const session = account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

//GET CURRENT USER CREDENTIALS
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Create post
export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}
//Update Post
export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 1;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = {
        ...image,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
      };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const updatedPost = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error;

  try {
    await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      postId
    );

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

//Upload the file
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

//Get uploaded URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appWriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

//DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appWriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  const post = await databases.listDocuments(
    appWriteConfig.databaseId,
    appWriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  if (!post) throw Error;
  return post;
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.saveCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// GET SAVED POST
export async function getSavedPost(userId: string) {
  try {
    const savedPosts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.saveCollectionId,
      [Query.equal("user", userId)]
    );

    return savedPosts;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.saveCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

//GET POST BY ID

export async function getPostById(postId: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePost({ pageParam }: { pageParam: string }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(3)];
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw posts;

    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function getSearchPost(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw posts;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPost(userId: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      [Query.equal("creator", userId)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitRecentPosts({
  pageParam,
}: {
  pageParam: string;
}) {
  let queries: any[] = [Query.orderDesc("$createdAt"), Query.limit(3)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    let recentPosts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      queries
    );

    if (!recentPosts) throw Error;
    return recentPosts;
  } catch (error) {
    console.log(error);
  }
}

export async function getTopUsers(limit?: number) {
  let query = [Query.orderDesc("$createdAt")];

  if (limit) {
    query.push(Query.limit(limit));
  }
  try {
    const users = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      query
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserLikedPost(userId: string) {
  try {
    const user = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length >= 1;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };
    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(user.file[0]);

      if (!uploadedFile) throw Error;
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = {
        ...image,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
      };
    }
    const updatedUser = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    if (!updatedUser) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw Error;
    }

    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getSearchUsers = async function (searchTerm: string) {
  try {
    const users = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.search("name", searchTerm)]
    );
    return users;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getActiveChats = async (currentUserID: string) => {
  try {
    const allChats = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.chatCollectionId
    );
    const activeChats = allChats.documents.filter((chat) =>
      //@ts-ignore
      chat.users.some((user) => user.$id === currentUserID)
    );
    return activeChats;
  } catch (error) {
    console.log(error);
  }
};

export const createChat = async ({
  currentUserId,
  otherUserId,
}: {
  currentUserId: string;
  otherUserId: string;
}) => {
  try {
    const isChatExist = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.chatCollectionId
    );

    let previousChat = isChatExist.documents.find((document) =>
      document.users.find((user: IProfileUser) => user.$id === otherUserId)
    );

    if (previousChat) {
      return previousChat;
    }
    const newChat = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.chatCollectionId,
      ID.unique(),
      {
        users: [currentUserId, otherUserId],
      }
    );
    return newChat;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async ({
  message,
  chatId,
  senderId,
}: {
  message: string;
  chatId: string;
  senderId: string;
}) => {
  try {
    const newmessage = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.messageCollectionId,
      ID.unique(),
      {
        message,
        chatId,
        senderId,
      }
    );

    if (!newmessage) throw new Error();

    return newmessage;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMesssagesByChatId = async ({ chatId }: { chatId: string }) => {
  try {
    const messages = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.messageCollectionId,
      [Query.equal("chatId", chatId), Query.orderDesc("$createdAt")]
    );
    return messages;
  } catch (error) {
    console.log(error);
    return error;
  }
};
