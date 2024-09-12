import { useAppDispatch, useAppSelector } from "@/app/function/hooks";
import { signIn } from "@/app/state/authSlice";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoLogoApple, IoLogoGoogle, IoMdCheckmarkCircle, IoMdLogIn } from "react-icons/io";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const [guestToken, setGuestToken] = useState('')
    const { token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const form = useForm({
        defaultValues: { communityId: "basic-ilv1fwm6", email: "molah7781@gmail.com", password: "" },
        mode: "onSubmit",
        criteriaMode: "firstError",
    });

    const guestTokenRequest = gql`
        query GetTokens($networkDomain: String!) {
            tokens(networkDomain: $networkDomain) {
                accessToken
                role {
                    name
                    scopes
                }
                member {
                    id
                    name
                }
            }
        }
    `;

    const memberTokenRequest = gql`
        mutation Login($usernameOrEmail: String!, $password: String!) {
            loginNetwork(input: {usernameOrEmail: $usernameOrEmail, password: $password}) {
                accessToken
                role {
                    name
                    scopes
                }
                member {
                    id
                    name
                }
            }
        }
    `;

    const [joinNetwork, joinNetworkStatus] = useLazyQuery(guestTokenRequest);
    const [loginMemeber, loginStatus] = useMutation(memberTokenRequest);

    const submit = async ({ communityId, email, password }) => {
        try {
            const guestResponse = await joinNetwork({ variables: { networkDomain: `${communityId}.bettermode.io` } });
            if (guestResponse.data) {
                const guest = guestResponse.data.tokens;
                localStorage.setItem('authToken', guest.accessToken);
                const { data: { loginNetwork: { accessToken, member } } } = await loginMemeber({ variables: { usernameOrEmail: email, password: password } });
                dispatch(signIn({ accessToken, member }));
                return <Navigate to={'/'} />
            }
        } catch (error) {
            console.log("Error during request:", error);
        }
    };

    return (
        <div className="flex h-screen w-full flex-grow items-center justify-center bg-slate-100">
            <div className="2x:w-7/12 flex h-auto min-h-screen w-full flex-row justify-center gap-4 rounded-2xl bg-white  shadow-2xl shadow-blue-400 md:w-10/12 lg:min-h-[40dvh] lg:w-8/12 xl:min-h-[50dvh]  xl:w-7/12 ">
                <form
                    onSubmit={form.handleSubmit(submit)}
                    className=" flex w-full flex-grow flex-col items-center justify-between gap-4 border-r px-8 py-6 lg:w-6/12">
                    <div className="flex h-auto items-center text-5xl font-bold text-black">Login</div>
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full flex-col gap-2 text-sm">
                            <label className=" text-primary ">Netwrok</label>
                            <div className="grid w-full grid-cols-5 items-center">
                                <input
                                    {...form.register("communityId")}
                                    placeholder="community domain prefix"
                                    className="focus:shadow-outline  col-span-3 h-12 w-full rounded-l border-2 border-r-0 bg-slate-100 p-2 text-black focus:border-2 focus:border-primary focus:outline-none"
                                />
                                <div className="focus:shadow-outline col-span-2 flex  h-12 items-center  justify-center rounded-r border-2 border-l bg-slate-100 p-2 text-center text-xs  font-bold tracking-widest text-black focus:border-2 focus:border-primary focus:outline-none">
                                    .bettermode.com
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 text-sm">
                            <label className=" text-primary ">Email</label>
                            <input
                                {...form.register("email")}
                                placeholder="example@gmail.com"
                                className="v  focus:shadow-outline h-12 rounded-lg border-2 bg-slate-100 p-2 text-black focus:border-2 focus:border-primary focus:outline-none  "
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2 text-sm">
                            <label className=" text-primary ">Password</label>
                            <input
                                {...form.register("password")}
                                placeholder="community member password"
                                type="password"
                                className="focus:shadow-outline  h-12 w-full   rounded-lg border-2 bg-slate-100 p-2 focus:border-2 focus:border-primary focus:outline-none "
                            />
                        </div>
                    </div>
                    {joinNetworkStatus.error && (
                        <div className="flex h-12 w-full items-center rounded-md bg-rose-500">
                            {joinNetworkStatus.error.graphQLErrors.map(({ message }, index) => (
                                <b key={index} className="px-4 text-left text-sm text-white">
                                    {message}
                                </b>
                            ))}
                        </div>
                    )}
                    {loginStatus.error && (
                        <div className="flex h-12 w-full items-center rounded-md bg-rose-500">
                            {loginStatus.error.graphQLErrors.map(({ message }, index) => (
                                <b key={index} className="px-4 text-left text-sm text-white">
                                    {message}
                                </b>
                            ))}
                        </div>
                    )}
                    <div className="flex w-full flex-col justify-end gap-2 text-sm">
                        <button
                            disabled={joinNetworkStatus.loading}
                            type="submit"
                            className="flex h-12 w-full flex-row items-center justify-center gap-2 rounded-lg  bg-black p-2 text-lg  font-bold text-white hover:bg-black/80 ">
                            {!joinNetworkStatus.loading && <IoMdLogIn className="h-5 w-5" />}
                            {joinNetworkStatus.loading && <IoMdCheckmarkCircle className="animate-spin" />}
                            <span>Sign In</span>
                        </button>
                    </div>
                    <div className="relative flex h-2 w-full flex-row items-center gap-2">
                        <hr className=" w-full border-b bg-black" />
                        <span className="  font-bold">Or</span>
                        <hr className=" w-full border-b bg-black" />
                    </div>
                    <div className="flex h-14 w-full gap-2">
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg border hover:bg-slate-100">
                            <IoLogoApple className="h-5 w-5" />
                            <span className="font-bold">Apple</span>
                        </button>
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg border hover:bg-slate-100">
                            <IoLogoGoogle className="h-5 w-5" />
                            <span className="font-bold">Google</span>
                        </button>
                    </div>
                </form>
                <div className="hidden flex-col items-center justify-center gap-4 rounded-2xl py-2 font-bold lg:flex lg:w-6/12">
                    <img alt="side-image" width={"45%"} height={"100%"} src="/public/side.svg" />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center text-3xl text-primary">Your Circle, Your Strength.</h1>
                        <h1 className="text-center text-2xl text-black">bettermode community</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
