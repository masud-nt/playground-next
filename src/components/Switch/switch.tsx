import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { FC, Fragment } from "react";

interface SwitchChildProps {
  students: any;
  current_student_id: string;
}

const SwitchChild: FC<SwitchChildProps> = ({
  students,
  current_student_id,
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        disabled={!students || students?.length < 2}
        className="w-full min-w-[200px] max-w-[250px] flex items-center justify-between p-1.5 border rounded-md overflow-hidden"
      >
        <div className="flex w-full items-center">
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src="/avatar.png"
            alt=""
          />
          <div className="flex items-center">
            <div className="ml-2 flex flex-col items-start">
              <p className="text-sm font-semibold leading-6 text-gray-900 text-start line-clamp-1">
                {
                  students?.find(
                    (s: any) => s?.student?.id === current_student_id
                  )?.student?.display_name
                }
              </p>
              {students?.length > 1 && (
                <p className="text-xs leading-none text-muted-foreground line-clamp-1 text-start">
                  Switch Child
                </p>
              )}
            </div>
          </div>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[100] w-full mt-2.5 min-w-[160px] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {students &&
            students?.map((student: any, idx: number) => (
              <Menu.Item key={idx}>
                {({ active }) => (
                  <Link
                    href={`/switch-child/${student?.student?.id}`}
                    className={cn(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    <p className="line-clamp-1">
                      {student?.student?.display_name}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="mt-1 flex text-xs leading-5 text-gray-500 text-start ">
                        {student?.student?.gender} - Class{" "}
                        {student?.student?.student_reg_group?.name}
                      </p>
                      <p className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                        {student?.student?.unread_letters?.aggregate?.count
                          ? student?.student?.unread_letters?.aggregate?.count
                          : "0"}
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { SwitchChild };
