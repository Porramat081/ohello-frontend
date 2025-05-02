import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export default function MessageBox() {
  return (
    <div>
      <div className="px-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col text-xs">
            <span>Username</span>
            <span className="text-[0.6rem]">Friends since July 2023</span>
          </div>
        </div>

        <div className="text-[0.7rem]">
          <span>35 July 2025</span>
        </div>
      </div>

      {/* message container */}
      <div>
        {/* Sender message */}
        <div className="px-4 py-2 min-w-[100px] w-[80%] ml-auto">
          <div className="bg-gray-200 rounded-2xl py-2 px-4">
            <span className="break-all">
              messgjraeopjgiaerjgiojreiogjierjpgoijerigad;sfkgkl;jsdfgkl;j;lksdfjgkljdfgkljage
              content eirgoerpjgoi
            </span>
          </div>
          <div className="flex justify-between text-[0.6rem] px-3">
            <div>sent : 10 July 2025</div>
            <div>read</div>
          </div>
        </div>

        {/* Recieved Message */}
        <div className="px-4 py-2 min-w-[100px] w-[80%] mr-auto">
          <div className="bg-secondary rounded-2xl py-2 px-4">
            <span className="break-all">
              messgjraeopjgiaerjgiojreiogjierjpgoijerigad;sfkgkl;jsdfgkl;j;lksdfjgkljdfgkljage
              content eirgoerpjgoi
            </span>
          </div>
          <div className="flex justify-between text-[0.6rem] px-3">
            <div>recieved : 10 July 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}
