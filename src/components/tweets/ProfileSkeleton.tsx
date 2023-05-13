export default function ProfileSkeleton() {
  return (
    <div>
      <div className="flex min-h-[5rem] w-full justify-between border-b p-2">
        <div className="flex px-2">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
          <div className="ml-4 flex flex-col space-y-1">
            <div className="h-3 w-40 animate-pulse  rounded-full bg-gray-200" />
            <div className="h-2 w-14 animate-pulse  rounded-full bg-gray-200" />
            <div className="h-2 w-14 animate-pulse  rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
