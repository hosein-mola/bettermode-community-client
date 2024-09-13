import {getMemebrSpaces, getMemebrPosts} from "@/app/api/graphql/query";
import {useAppDispatch, useAppSelector} from "@/app/function/hooks";
import useScrollToElement from "@/app/hook/useScrollTo";
import {setSelectedSpace, setSpace, mergePosts, setOffset} from "@/app/state/postsSlice";
import {Reactions} from "@/component/reactions";
import {useQuery, useLazyQuery} from "@apollo/client";
import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect} from "react";
import {FaSpinner} from "react-icons/fa6";
import {VscGitFetch} from "react-icons/vsc";
import {IoMdMenu, IoMdImage, IoMdLogOut} from "react-icons/io";
import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";
import {signOut} from "@/app/state/authSlice";

// Other imports...

function Home() {
    const dispatch = useAppDispatch();
    const scrollTo = useScrollToElement("more");
    const {member} = useAppSelector((state) => state.auth);
    const {posts, spaces, limit, hasFetched, offset, selectedSpace} = useAppSelector((state) => state.posts);
    const [menu, showMenu] = useState(false);
    const {isLoggedIn} = useAppSelector((state) => state.auth);

    const spacesRequest = useQuery(getMemebrSpaces, {
        variables: {memberId: String(member.id)},
        skip: spaces.length > 0,
        onCompleted: (data) => {
            if (selectedSpace == "") {
                dispatch(setSelectedSpace({selectedSpace: data.spaces.nodes[0].id}));
                dispatch(setSpace({spaces: data.spaces.nodes}));
            }
        },
    });

    const [postsRequest, postRequestStatus] = useLazyQuery(getMemebrPosts, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            dispatch(mergePosts({posts: data.posts.nodes}));
        },
    });

    useEffect(() => {
        const run = async () => {
            if (selectedSpace) {
                const postsResponse = await postsRequest({
                    variables: {spaceIds: selectedSpace, limit, offset},
                });
            }
        };
        if (!hasFetched) {
            run();
        }
        scrollTo();
    }, [selectedSpace, limit, offset]);

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
            {/* Mobile menu button */}
            <div className="flex h-14 min-h-[3.5rem] w-full select-none items-center gap-2  border-b bg-white px-4">
                <IoMdMenu className="h-6 w-6 cursor-pointer hover:text-teal-600" onClick={() => showMenu(!menu)} />
                <span className="font-bold">Menu</span>
            </div>
            {/* Mobile menu */}
            <AnimatePresence>
                {menu && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        className="w-full bg-white shadow-lg">
                        <div className="flex flex-col items-start ">
                            <div className="flex h-12 w-full items-center border-b">
                                {isLoggedIn && (
                                    <button
                                        className="group flex flex-row gap-4 px-4 text-2xl font-bold hover:bg-slate-100"
                                        onClick={() => dispatch(signOut())}>
                                        <IoMdLogOut title="logOut" className="h-8 w-8 hover:text-teal-600" />
                                        LogOut
                                    </button>
                                )}
                            </div>
                            {spacesRequest.loading && spaces.length == 0
                                ? renderSkeletons()
                                : spaces.map((space) => (
                                      <button
                                          disabled={postRequestStatus.loading}
                                          id={space.id}
                                          key={space.id}
                                          onClick={() => {
                                              dispatch(setSelectedSpace({selectedSpace: space.id}));
                                              showMenu(false); // Close menu on selection
                                          }}
                                          className={twMerge(
                                              "text-md group  flex h-auto w-full cursor-pointer flex-row items-center justify-between gap-3 py-2 px-2 hover:bg-primary/10 disabled:bg-slate-100"
                                          )}>
                                          <div
                                              className={twMerge(
                                                  "h-3 w-4 self-center overflow-clip rounded-full group-disabled:bg-slate-400 ",
                                                  selectedSpace == space.id && "bg-teal-500 "
                                              )}></div>
                                          <h3 className="w-full">{space.name}</h3>
                                          <p>{space.postsCount}</p>
                                      </button>
                                  ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex min-h-[3rem] w-full items-center border-b bg-gradient-to-r from-teal-900 via-sky-900 to-sky-800 px-4 text-xl font-medium text-white">
                Posts
            </div>

            <div className="bg-w mt-2 flex w-full flex-row gap-9 overflow-hidden md:w-full md:p-8 lg:w-11/12 2xl:w-8/12">
                <div className="hidden w-3/12 flex-col gap-4 text-start md:flex">
                    <div className="text-xl font-bold text-primary drop-shadow-sm">Spaces</div>
                    <hr className="w-full" />
                    {spacesRequest.loading && spaces.length == 0
                        ? renderSkeletons()
                        : spaces.map((space) => (
                              <button
                                  disabled={postRequestStatus.loading}
                                  id={space.id}
                                  key={space.id}
                                  onClick={() => {
                                      dispatch(setSelectedSpace({selectedSpace: space.id}));
                                  }}
                                  className={twMerge(
                                      "text-md group flex h-auto cursor-pointer flex-row items-center justify-between gap-3 py-2 px-2 hover:bg-primary/10 disabled:bg-slate-100"
                                  )}>
                                  <div
                                      className={twMerge(
                                          "h-3 w-4 self-center overflow-clip rounded-full group-disabled:bg-slate-400 ",
                                          selectedSpace == space.id && "bg-teal-500 "
                                      )}></div>
                                  <h3 className="w-full">{space.name}</h3>
                                  <p>{space.postsCount}</p>
                              </button>
                          ))}
                </div>

                {/* Posts grid */}
                <div className="grid max-h-screen w-full grid-cols-1 gap-4 overflow-y-scroll rounded-lg bg-white p-4 shadow-lg shadow-blue-200 md:w-10/12 md:grid-cols-3">
                    {(postRequestStatus.loading || spacesRequest.loading) && posts.length == 0
                        ? renderPostSkeletons()
                        : posts?.map((post: any) => (
                              <Link
                                  to={`/post/${post.id}`}
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
                                  <div className="flex h-14 w-full flex-grow flex-col p-1">
                                      <Reactions callback={() => 0} post={post} member={member} />
                                  </div>
                              </Link>
                          ))}

                    <button
                        disabled={postRequestStatus.loading}
                        onClick={() => dispatch(setOffset({offset: offset + limit}))}
                        className="col-span-1  flex h-14 cursor-pointer items-center justify-center border-t border-b font-bold hover:bg-slate-100 md:col-span-3">
                        {postRequestStatus.loading ? (
                            <div className="flex gap-2">
                                <FaSpinner className="h-6 w-6 animate-spin" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div id="more" className="flex gap-2">
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
