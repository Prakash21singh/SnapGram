import { Models } from "appwrite";
import { Link } from "react-router-dom";
type GridPostListProps = {
  posts: Models.Document[];
};
const SavedPost = ({ posts }: GridPostListProps) => {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2 2xl:justify-between 2xl:gap-3 w-[90%] m-auto lg:w-full ">
      {posts.map((post) => (
        <li
          key={post.post.$id}
          className="relative h-80 min-w-[22rem] w-[30%] ">
          <Link to={`/posts/${post.post.$id}`} className="grid-post_link">
            <img
              src={post.post.imageUrl}
              alt="image"
              className="h-full w-full object-cover"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SavedPost;
