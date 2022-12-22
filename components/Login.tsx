import { signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
        src="/icons/twitter_green.svg"
        width={150}
        height={150}
        objectFit="contain"
        alt={""}
      />

      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <a
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="cursor-pointer relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-500 ease-in-out bg-green-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out delay-100 bg-green-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
              <span className="relative text-green-700 transition-colors duration-300 ease-in-out delay-100 group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
