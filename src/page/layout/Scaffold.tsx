import {useAppSelector} from "@/app/function/hooks";
import {signOut} from "@/app/state/authSlice";
import React from "react";
import {useDispatch} from "react-redux";
import {Link, Outlet} from "react-router-dom";
import {IoMdLogOut} from "react-icons/io";

const Scaffold = () => {
    const {isLoggedIn} = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <div className="flex max-h-screen w-full  flex-grow flex-col overflow-hidden bg-slate-100 ">
            <div className="hidden h-14 min-h-[3.5rem] w-full items-center justify-between border-b bg-white px-4 text-xl  font-bold md:flex">
                <Link to={"/"} className="bg-w flex flex-row  items-center gap-4">
                    <div className="relative flex w-5 items-center">
                        <div className="absolute left-0 h-8 w-8 rounded-full bg-emerald-600"></div>
                        <div className="absolute left-4 h-8 w-8 rounded-full bg-blue-500"></div>
                        <div className="absolute left-8 h-8 w-8 rounded-full bg-black"></div>
                    </div>
                    <div className="ml-10"> Bettermode community</div>
                </Link>
                {!isLoggedIn && (
                    <div className="flex gap-3">
                        <Link to={"login"}>SignIn</Link>
                        <span>/</span>
                        <span>SignUp</span>
                    </div>
                )}
                {isLoggedIn && (
                    <button className="group text-2xl font-bold" onClick={() => dispatch(signOut())}>
                        <IoMdLogOut title="logOut" className="h-8 w-8 group-hover:text-teal-600" />
                    </button>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default Scaffold;
