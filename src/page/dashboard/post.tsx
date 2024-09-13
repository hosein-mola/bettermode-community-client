import {addReactionToPost, getMemberPost} from "@/app/api/graphql/query";
import {useAppSelector} from "@/app/function/hooks";
import {gql, useMutation, useQuery} from "@apollo/client";
import React, {useRef, useState} from "react";
import {FaChevronLeft, FaHeart, FaHeartPulse} from "react-icons/fa6";
import {IoIosHeartEmpty, IoMdImage} from "react-icons/io";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FacebookSelector, FacebookCounter, GithubCounter} from "@charkour/react-reactions";
import useOutsideClick from "@/app/hook/useClickOutside";
import {Reactions} from "@/component/reactions";

// Define the type for Post
interface Post {
    title: string;
    description: string;
    status: string;
    shortContent: string;
    createdAt: string;
    reactionsCount: number;
    thumbnail: {
        id: string;
        url: string;
        width: number;
        height: number;
    } | null;
}

// Skeleton component for loading
const PostSkeleton = () => (
    <div className="h-[58vh] animate-pulse">
        <div className="flex items-center gap-2 p-4">
            <div className="h-6 w-6 rounded-full bg-slate-300"></div>
            <div className="h-6 w-24 rounded bg-slate-300"></div>
        </div>
        <div className="h-80 w-full bg-slate-300"></div>
        <div className="mx-4 mt-4 h-12 w-1/2 bg-slate-300"></div>
        <div className="mx-4 mt-4 h-24 bg-slate-300"></div>
        <div className="mx-4 mt-4 h-12 w-14 rounded-full bg-slate-300"></div>
    </div>
);

function PostPage() {
    const param = useParams();
    const navigate = useNavigate();
    const {member} = useAppSelector((state) => state.auth);
    const [post, setPost] = useState<any | null>(null);

    const [addReaction, addReactionStatus] = useMutation(addReactionToPost, {
        variables: {
            postId: "bWQRtrl9Xfjnc43",
            input: {
                overrideSingleChoiceReactions: true,
                reaction: "like",
            },
        },
    });

    const {loading, error} = useQuery(getMemberPost, {
        variables: {id: param.id},
        onCompleted: (data) => {
            setPost(data.post);
        },
    });

    return (
        <div className="flex h-screen max-h-screen w-full flex-col items-center overflow-hidden ">
            <div className="flex min-h-[3rem] w-full items-center border-b bg-gradient-to-r from-teal-900 via-sky-900 to-sky-800 px-4 text-xl font-medium text-white">
                Post
            </div>
            <div className="2xl:5/12 mt-2 flex w-full flex-row gap-9 overflow-hidden md:w-10/12 md:p-8 lg:w-8/12 xl:w-6/12">
                <div className="grid max-h-screen w-full grid-cols-1 justify-between  gap-4 rounded-lg bg-white  shadow-lg shadow-blue-200 md:grid-cols-1">
                    {loading ? (
                        <PostSkeleton />
                    ) : post ? (
                        <div className="post-content relative overflow-auto">
                            <div className="sticky top-0 flex h-auto flex-col items-start  border-b border-slate-300 bg-white ">
                                <div className="flex flex-row items-center gap-4  px-4 py-2">
                                    <FaChevronLeft
                                        onClick={() => navigate("/", {state: {origin: "post"}})}
                                        className="h-5 w-5 cursor-pointer hover:text-teal-500"
                                    />
                                    <div className="flex items-center gap-2">
                                        <div className="m-auto flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-white">
                                            {member?.name?.[0].toLocaleUpperCase()}
                                        </div>
                                        <h1 className=" text-wrap flex cursor-pointer flex-wrap text-lg hover:underline ">
                                            {member.name}
                                        </h1>
                                    </div>
                                </div>
                                <h1 className=" flex h-12 w-full items-center justify-between border-t px-4 text-base font-bold">
                                    <span>{post.title}</span>
                                    <span className="text-sm font-medium text-slate-400">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </h1>
                            </div>
                            <div>
                                {post.thumbnail ? (
                                    <img
                                        className=" h-96 w-full object-cover"
                                        src={post.thumbnail.url}
                                        alt={post.title}
                                        width={post.thumbnail.width}
                                        height={post.thumbnail.height}
                                    />
                                ) : (
                                    <div className="flex h-96 w-full items-center justify-center bg-slate-200">
                                        <IoMdImage className="h-32 w-32 text-slate-400" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 border-t px-2" dangerouslySetInnerHTML={{__html: post.shortContent}} />
                        </div>
                    ) : null}
                    <div className=" h-12 w-full ">
                        {post && <Reactions post={post} member={member} callback={addReaction} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
