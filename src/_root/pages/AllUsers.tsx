import Creator from "@/components/shared/Creator";
import Loader from "@/components/shared/Loader";
import { toast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import { ToastAction } from "@radix-ui/react-toast";
import UserIcon from "/assets/icons/people.svg";
const AllUsers = () => {
  let { data: users, isPending: isUsersLoading } = useGetUsers();

  return (
    <div className="home_creators w-full gap-5">
      <div className="flex flex-wrap gap-5 items-center justify-center 2xl:justify-start mt-12 w-full">
        {isUsersLoading ? (
          <Loader />
        ) : (
          <div>
            <p className="text-2xl font-semibold my-4 ml-5 flex items-center justify-start">
              {" "}
              <img src={UserIcon} alt="User" className="w-8" /> Users
            </p>
            <div className="w-full flex flex-wrap justify-start items-start gap-2 p-4">
              {users?.documents?.map((user, index) => (
                <div className="w-full lg:w-[45%] 2xl:w-[32%] ">
                  <Creator
                    key={`userIndex-${index}`}
                    imageUrl={user.imageUrl}
                    handleFollowCreator={(e) => {
                      e.stopPropagation();
                      return toast({
                        title: "Feature not Available!",
                        description: "This feature is not available right now.",
                        action: (
                          <ToastAction
                            className="border px-5 py-2 rounded-lg border-gray-800"
                            altText="Try again">
                            Try again
                          </ToastAction>
                        ),
                        variant: "default",
                      });
                    }}
                    userId={user.$id}
                    name={user.name}
                    username={user.username}
                    className={"2xl:min-w-96"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
