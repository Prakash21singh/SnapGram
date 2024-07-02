import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultProp = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProp) => {
  if (isSearchFetching) <Loader />;
  //@ts-ignore
  if (searchedPosts && searchedPosts?.documents.length > 0) {
    //@ts-ignore
    return <GridPostList posts={searchedPosts?.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results Found</p>
  );
};

export default SearchResults;
