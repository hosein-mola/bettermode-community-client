import useOutsideClick from "@/app/hook/useClickOutside";
import post from "@/page/dashboard/post";
import {FacebookSelector, GithubCounter} from "@charkour/react-reactions";
import React, {useRef, useState} from "react";

const emojies = {
    heart: "💓",
    like: "👍",
    tada: "🎉",
    "+1": "👍",
    open_mouth: "😮",
};

export const Reactions = ({callback, member, post}) => {
    const ref = useRef(null);
    const [isMouseOverReaction, setIsMouseOverReaction] = useState(false);
    const clickOutside = useOutsideClick(
        ref,
        () => {
            setIsMouseOverReaction(false);
        },
        []
    );

    return (
        <div className="  relative flex h-full w-full items-center  border px-2">
            <div className="cursor-pointer rounded-full bg-slate-200 " onMouseEnter={() => setIsMouseOverReaction(true)}>
                {!isMouseOverReaction && <p className="text-2xl">😐</p>}
                {isMouseOverReaction && <p className="text-2xl">😁</p>}
            </div>
            {isMouseOverReaction && (
                <div ref={ref} className="absolute -top-8 z-10 shadow-xl">
                    <FacebookSelector iconSize={25} onSelect={(data) => callback()} />
                </div>
            )}
            <div id="reaction" className="">
                <GithubCounter
                    user={member.user}
                    counters={post.reactions.map((reaction) => ({
                        emoji: emojies[reaction.reaction],
                        by: reaction.reaction,
                    }))}
                />
            </div>
        </div>
    );
};
