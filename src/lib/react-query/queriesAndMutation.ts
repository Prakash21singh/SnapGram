import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  QueryClient,
} from "@tanstack/react-query";
import {
  SignInAccount,
  SignOutAccount,
  UpdateUser,
  createChat,
  createPost,
  createUserAccount,
  deletePost,
  deleteSavedPost,
  getActiveChats,
  getCurrentUser,
  getInfinitRecentPosts,
  getInfinitePost,
  getPostById,
  getRecentPosts,
  getSavedPost,
  getSearchPost,
  getSearchUsers,
  getTopUsers,
  getUserById,
  getUserLikedPost,
  getUserPost,
  likePost,
  savePost,
  updatePost,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";
import { Models } from "appwrite";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      SignInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: SignOutAccount,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_RECENTPOSTS],
    //@ts-ignore
    queryFn: getInfinitRecentPosts,
    getNextPageParam: (lastpage: Models.DocumentList<Models.Document>) => {
      if (lastpage?.documents.length === 0 && !lastpage) return null;
      let lastId = lastpage.documents[lastpage?.documents.length - 1]?.$id;
      return lastId;
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_LIKED_POST],
      });
    },
  });
};

//SAVED POST
export const useGetSavedPost = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POST],
    queryFn: () => getSavedPost(userId),
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POST],
      });
    },
  });
};
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POST],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POST],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    //@ts-ignore
    queryFn: getInfinitePost,
    getNextPageParam: (lastpage: Models.DocumentList<Models.Document>) => {
      //@ts-ignore
      if (!lastpage && lastpage?.documents?.length === 0) return null;
      const lastId = lastpage?.documents[lastpage?.documents.length - 1]?.$id;
      return lastId;
    },
  });
};

export const useGetUserPost = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS_POST],
    //@ts-ignore
    queryFn: () => getUserPost(userId),
  });
};

export const useGetUserLikedPost = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_LIKED_POST],
    queryFn: () => getUserLikedPost(userId),
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => getSearchPost(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetUsers = (number?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getTopUsers(number),
  });
};

export const useSearchUser = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SEARCH_USER],
    queryFn: () => getSearchUsers(searchTerm),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => UpdateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        //@ts-ignore
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetActiveChat = (currentUserId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACTIVE_CHATS_FOR_USER],
    queryFn: () => getActiveChats(currentUserId),
    enabled: !!currentUserId,
  });
};

export const useCreateActiveChat = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({
      currentUserId,
      otherUserId,
    }: {
      currentUserId: string;
      otherUserId: string;
    }) => createChat({ currentUserId, otherUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACTIVE_CHATS_FOR_USER],
      });
    },
  });
};
