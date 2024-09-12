import {useAppSelector} from "@/app/function/hooks";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import {IoMdImage} from "react-icons/io";
import {FaSpinner} from "react-icons/fa6";
import {VscGitFetch} from "react-icons/vsc";
import {twMerge} from "tailwind-merge";

function Home() {
    const {member} = useAppSelector((state) => state.auth);
    const [selectedSpace, setSelectedSpace] = useState("");
    const [limit, setLimit] = useState(3);
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState<any>([]);

    const getMemebrSpaces = gql`
        query GetSpaces($memberId: ID!) {
            spaces(memberId: $memberId, limit: 10) {
                nodes {
                    id
                    name
                    postsCount
                }
                totalCount
            }
        }
    `;

    const getMemebrPosts = gql`
        query GetPosts($spaceIds: [ID!], $limit: Int!, $offset: Int) {
            posts(spaceIds: $spaceIds, limit: $limit, offset: $offset) {
                nodes {
                    id
                    title
                    thumbnail {
                        ... on Image {
                            id
                            url
                            width
                            height
                        }
                        ... on File {
                            id
                            downloadUrl
                        }
                    }
                    description
                }
                totalCount
            }
        }
    `;

    const spacesRequest = useQuery(getMemebrSpaces, {
        variables: {memberId: String(member.id)},
        onCompleted: (data) => {
            setSelectedSpace(data.spaces.nodes[0].id);
        },
    });

    const [postsRequest, postRequestStatus] = useLazyQuery(getMemebrPosts);

    useEffect(() => {
        const run = async () => {
            const postsResponse = await postsRequest({variables: {spaceIds: selectedSpace, limit, offset}});
            console.log("🚀 ~ run ~ postsResponse:", postsResponse.data.posts);
            setPosts((prev) => [...prev, ...postsResponse.data.posts.nodes]);
        };
        if (selectedSpace !== "") {
            run();
        }
    }, [selectedSpace, offset, limit]);

    const renderSkeletons = () => {
        return Array.from({length: 3}).map((_, idx) => (
            <div
                key={"spaces" + idx}
                className="flex h-8 animate-pulse flex-row items-center justify-between rounded-lg bg-slate-300 px-4 text-lg text-primary duration-75">
                <h3 className=""></h3>
                <p></p>
            </div>
        ));
    };

    const renderPostSkeletons = () => {
        return Array.from({length: 3}).map((_, idx) => (
            <div key={"post" + idx} className="h-96 animate-pulse rounded-lg bg-slate-300"></div>
        ));
    };

    return (
        <div className="flex h-screen max-h-screen w-full flex-col items-center overflow-hidden ">
            <div className="flex min-h-[3rem] w-full items-center border-b bg-gradient-to-r from-teal-900 via-sky-900 to-sky-800 px-4 text-xl font-medium text-white">
                Posts
            </div>
            <div className="h-14 w-full border-b bg-white"></div>
            <div className="bg-w mt-2 flex w-full flex-row gap-9 overflow-hidden md:w-full md:p-8 lg:w-11/12 2xl:w-8/12">
                <div className="hidden w-3/12 flex-col gap-4 text-start md:flex">
                    <div className="text-xl font-bold text-primary drop-shadow-sm">Spaces</div>
                    <hr className="w-full" />
                    {spacesRequest.loading
                        ? renderSkeletons()
                        : spacesRequest.data?.spaces?.nodes?.map((space) => (
                              <div
                                  id={space.id}
                                  key={space.id}
                                  onClick={() => {
                                      setSelectedSpace(space.id);
                                      setPosts([]);
                                      setOffset(0);
                                  }}
                                  className={twMerge(
                                      "text-md flex h-auto cursor-pointer flex-row items-center justify-between gap-3 py-2 px-2 hover:bg-primary/10"
                                  )}>
                                  <div
                                      className={twMerge(
                                          "h-3 w-4 self-center overflow-clip rounded-full ",
                                          selectedSpace == space.id && "bg-teal-500 "
                                      )}></div>
                                  <h3 className="w-full">{space.name}</h3>
                                  <p>{space.postsCount}</p>
                              </div>
                          ))}
                </div>
                <div className="grid max-h-screen w-full grid-cols-1 gap-4 overflow-y-scroll rounded-lg bg-white p-4 shadow-lg shadow-blue-300 md:w-10/12 md:grid-cols-3">
                    {(postRequestStatus.loading || spacesRequest.loading) && posts.length == 0
                        ? renderPostSkeletons()
                        : posts?.map((post: any) => (
                              <div
                                  key={post.id}
                                  className="flex h-96 cursor-pointer flex-col  justify-between rounded-md border bg-white hover:ring-4 hover:ring-primary">
                                  {post.thumbnail?.url ? (
                                      <img
                                          src={post.thumbnail?.url}
                                          alt={post.title}
                                          className="flex h-1/3  w-full flex-grow rounded-t-md border object-cover"
                                      />
                                  ) : (
                                      <div className="flex h-1/3 w-full flex-grow items-center justify-center rounded-t-md bg-slate-200">
                                          <IoMdImage className="h-12 w-12 text-slate-400" />
                                      </div>
                                  )}
                                  <div className="flex h-2/3 flex-grow flex-col gap-4 p-4">
                                      <h3 className=" text-lg font-bold line-clamp-3">{post.title}</h3>
                                      <p className="line-clamp-5">{post.description}</p>
                                  </div>
                              </div>
                          ))}
                    <button
                        disabled={postRequestStatus.loading}
                        onClick={() => setOffset((prev) => prev + limit)}
                        className="col-span-1  flex h-14 cursor-pointer items-center justify-center border-t border-b font-bold hover:bg-slate-100 md:col-span-3">
                        {postRequestStatus.loading ? (
                            <div className="flex gap-2">
                                <FaSpinner className="h-6 w-6 animate-spin" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <VscGitFetch className="h-6 w-6" />
                                <span>more...</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
