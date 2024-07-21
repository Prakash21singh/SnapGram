import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  useCreateMessage,
  useGetMessages,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutation";
import Reciever from "@/components/shared/Reciever";
import Sender from "@/components/shared/Sender";
import UserProfile from "@/components/shared/UserProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { MessageValidation } from "@/lib/validation";
import { ICreatedMessage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { appWriteConfig, client } from "../../lib/appwrite/config";
const Message = () => {
  let { chatId, userId } = useParams();
  let [messages, setMessages] = useState([]);
  let { user } = useUserContext();
  let { mutateAsync: createMessage, isPending: isCreating } =
    useCreateMessage();

  let {
    data: reciever,
    isPending: isLoadingReciever,
    error,
    refetch,
    isRefetching,
  } = useGetUserById(userId || "");
  let {
    data,
    refetch: refetchChat,
    isPending: isGettingMessages,
    isRefetching: isRefetchingChat,
  } = useGetMessages({
    chatId: chatId || "",
  });

  useEffect(() => {
    if (chatId && userId) {
      refetch();
      refetchChat();
    }
  }, [chatId, userId]);

  useEffect(() => {
    // @ts-ignore
    if (data?.documents) {
      // @ts-ignore
      setMessages(data.documents);
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${appWriteConfig.databaseId}.collections.${appWriteConfig.messageCollectionId}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log(response.payload);
          // @ts-ignore
          if (response.payload.chatId.$id === chatId) {
            // @ts-ignore
            setMessages((prevValue) => [response.payload, ...prevValue]);
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const currentuser = user?.id || "";

  const form = useForm<z.infer<typeof MessageValidation>>({
    resolver: zodResolver(MessageValidation),
    defaultValues: {
      senderId: currentuser && currentuser,
      chatId: chatId,
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof MessageValidation>) {
    createMessage({
      chatId: values.chatId,
      message: values.content,
      senderId: currentuser || values.senderId,
    })
      .then(() => {
        form.reset();
      })
      .catch((error) => {
        return toast({
          title: "something went wrong",
          description: error.message,
        });
      });
  }

  if (chatId?.length !== 20 || userId?.length !== 20) {
    return <h1>Something is wrong</h1>;
  }

  if (error) {
    return (
      <div className="w-full h-full flex-center">
        <h1 className="capitalize font-semibold text-3xl">
          Invalid user id ⚠️
        </h1>
      </div>
    );
  }
  if (
    isLoadingReciever ||
    isGettingMessages ||
    isRefetching ||
    isRefetchingChat
  ) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="message-card">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="w-full border-b border-dark-4 p-4">
          <UserProfile
            // @ts-ignore
            user={reciever}
          />
        </div>
        <div className="flex-1 w-full h-full  p-3 gap-3  outline-none flex flex-col-reverse overflow-auto custom-scrollbar">
          {messages &&
            messages.map((msg: ICreatedMessage) =>
              msg.senderId?.$id === currentuser ? (
                <Sender key={msg?.$id} message={msg} />
              ) : (
                <Reciever key={msg?.$id} message={msg} />
              )
            )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-5xl items-center justify-center gap-2 pt-3 border-t border-dark-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shad-input"
                      {...field}
                      placeholder="Enter your message here!!!"
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-yellow-300 h-full rounded-xl">
              {isCreating ? (
                <Loader />
              ) : (
                <img src="/assets/icons/send.svg" alt="send" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Message;
