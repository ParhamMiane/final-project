import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/design-system/DsLoading";
import PageHeader from "../../../components/design-system/PageHeader";
import { useParams } from "react-router";
import { getPostApi } from "../../../services/post-service";

const PostDetails = () => {

  const {postId} = useParams()

  const {data: details, isLoading} = useQuery({
    queryKey: [`post-detail-${postId}`],
    queryFn: () => getPostApi(Number(postId))
  })

  return (
    <>
      <PageHeader show={true} backRoute="/app/posts">
        {`Post Details - ${postId}`}
      </PageHeader>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-gray-700 p-4 rounded-lg w-1/2">
          <h2 className="text-2xl font-bold">{details?.title || '-'}</h2>
          <br />
          <p>{details?.body || '-'}</p>
        </div>
      )}
    </>
  );
};

export default PostDetails;
