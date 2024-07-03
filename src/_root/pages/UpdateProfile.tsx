import ImageUploader from "@/components/shared/ImageUploader";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutation";
import { ProfileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const UpdateProfile = () => {
  const { user, setUser } = useUserContext();
  let { id } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user?.name,
      username: user?.username,
      email: user?.email,
      bio: user?.bio || "",
    },
  });
  useEffect(() => {
    if (id !== user.id) {
      navigate(-1);
    }
  }, [id]);

  //Queries
  let { data: currentUser, isPending: isCurrentUser } = useGetUserById(user.id);
  let { mutateAsync: updateUser, isPending: isUserUpdated } = useUpdateUser();

  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
    console.log({ currentUser });
    const updatedUser = await updateUser({
      //@ts-ignore
      userId: currentUser?.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser?.imageUrl,
      imageId: currentUser?.imageId,
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    console.log({ updateUser });
    setUser({
      ...user,
      // @ts-ignore
      name: updatedUser?.name,
      // @ts-ignore
      bio: updatedUser?.bio,
      // @ts-ignore
      imageUrl: updatedUser?.imageUrl,
    });
  }

  return (
    <>
      {isCurrentUser ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-9 w-[90%] m-auto max-w-5xl">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="w-16 h-16">
                    <ImageUploader
                      fieldChange={field.onChange}
                      mediaUrl={user?.imageUrl}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Update your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      placeholder="Update Username"
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Update your email"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Your biography"
                      {...field}
                      className="shad-textarea custom-scrollbar"
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-4">
              <Button type="submit" className="shad-button_dark_4">
                {isUserUpdated ? <Loader /> : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default UpdateProfile;
