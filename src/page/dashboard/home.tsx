import { gql, useQuery } from "@apollo/client";
import React from "react";
import { IoIosGrid, IoIosListBox } from "react-icons/io";

function home() {

    return (
        <div className="flex max-h-screen h-screen w-full flex-col items-center overflow-hidden ">
            <div className="flex min-h-[3.5rem] w-full items-center border-b bg-gradient-to-r from-teal-800 via-sky-700 to-sky-500 px-4 text-2xl font-medium text-white">
                Spaces
            </div>
            <div className="h-14 w-full border-b bg-white"></div>
            <div className="mt-2 flex w-full flex-row gap-2 overflow-hidden md:w-full lg:w-11/12  2xl:w-7/12 md:p-8 bg-w">
                <div className="hidden w-2/12 md:flex flex-col gap-4 text-center">
                    <div className="text-xl font-bold text-primary drop-shadow-sm">Spaces</div>
                    <hr className="w-full" />
                </div>
                <div className="grid max-h-screen  w-full grid-cols-3 gap-4 overflow-y-scroll   bg-white rounded-lg  p-4 shadow-lg shadow-blue-300 md:w-10/12">
                    <div className="h-96  bg-primary"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="h-96  bg-green-500"></div>
                    <div className="col-span-3 justify-center items-center flex font-bold">More</div>
                </div>
            </div>
        </div>
    );
}

export default home;
