import React, { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      <Menu.Button className="-m-1.5 w-full min-w-[230px] max-w-[250px] flex items-center justify-between p-1.5 border rounded-md overflow-hidden">
        <div className="flex w-full">
          {false ? (
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src={"https://google.com"}
              alt=""
            />
          ) : (
            <svg
              className={cn("h-8 w-8 rounded-full text-primary stroke-primary")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
          <div className="flex flex-col items-start justify-center space-y-1 px-3 overflow-hidden">
            <p
              className={cn(
                "text-sm font-medium text-start truncate w-full text-primary text-gray-900"
              )}
            >
              {
                students?.find((s: any) => s?.id === current_student_id)
                  ?.display_name
              }{" "}
              dfg dgfdjkgfhujkg xdfgdfgdf
            </p>
            <p className={cn("text-xs leading-none text-muted-foreground")}>
              Switch Child
            </p>
          </div>
        </div>

        {/* <ChevronDownIcon
          className={cn(
            "ml-2 h-5 w-5",
            variant === "primary" ? "text-muted-foreground" : "text-white "
          )}
          aria-hidden="true"
        /> */}
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
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-full origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none divide-y">
          {students &&
            students?.map((student, idx) => (
              <Menu.Item key={idx}>
                {({ active }) => (
                  <Link
                    href={`/switch-child/${student.id}`}
                    className={cn(
                      // active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      <p>
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {student.display_name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        {student.gender} - Class{" "}
                        {student?.student_reg_group?.name}
                      </p>
                      <p className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                        {student.unread_letters?.aggregate?.count
                          ? student.unread_letters?.aggregate?.count
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

export default SwitchChild;
