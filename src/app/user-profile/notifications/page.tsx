// "use client";
import ComingSoon from "@/components/common/ComingSoon";

// const NotificationItem = ({ user, type, content, time }: NotificationProps) => {
//   return (
//     <div className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors w-full">
//       <Avatar className="h-10 w-10">
//         <AvatarImage src={user.avatar} />
//         <AvatarFallback>{user.name[0]}</AvatarFallback>
//       </Avatar>
//       <div className="flex-1">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-900">{user.name}</p>
//             <p className="text-sm text-gray-500">{content}</p>
//             <span className="text-xs text-gray-400">{time}</span>
//           </div>
//         </div>
//         {type === "request" && (
//           <div className="mt-2 space-x-2">
//             <Button size="sm" className="bg-primary">
//               Approve
//             </Button>
//             <Button variant="outline" size="sm">
//               Decline
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const NotificationsPage = () => {
  // const notifications = [
  //   {
  //     user: {
  //       name: "Dennis Nedry",
  //       avatar: "https://avatar.iran.liara.run/public/boy",
  //     },
  //     type: "comment" as const,
  //     content: "commented on Isla Nublar SOC2 compliance report",
  //     time: "Last Wednesday at 9:42 AM",
  //   },
  //   {
  //     user: {
  //       name: "Dennis Nedry",
  //       avatar: "https://avatar.iran.liara.run/public/boy",
  //     },
  //     type: "request" as const,
  //     content: "requested access to Isla Nublar SOC2 compliance report",
  //     time: "Last Wednesday at 9:42 AM",
  //   },
  //   {
  //     user: {
  //       name: "Dennis Nedry",
  //       avatar: "https://avatar.iran.liara.run/public/boy",
  //     },
  //     type: "comment" as const,
  //     content: "commented on Isla Nublar SOC2 compliance report",
  //     time: "Last Wednesday at 9:42 AM",
  //   },
  // ];

  return (
    <div className=" relative w-[calc(100vw - 96px)] md:w[calc(100vw - 240px)] ">
      {/* <div className="w-full flex justify-center items-start h-[calc(100vh-96px)]">
        <div className=" h-screen bg-white rounded-lg  w-full ">
          {notifications.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
        </div>
      </div> */}
      <ComingSoon />
    </div>
  );
};

export default NotificationsPage;
