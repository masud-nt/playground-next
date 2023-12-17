import React, { FC, Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SidebarNavItem, SidebarNavs } from "../SidebarNavs";
import { cn } from "@/lib/utils";
import SwitchChild from "../SwitchChild/switchChild";

export interface UserMenuProps {
  name: string;
  avatar?: string;
  navs?: SidebarNavItem[];
}

interface SidebarProps {
  items: SidebarNavItem[];
  LinkRenderer?: any;
  logo?: string;
}
export interface LayoutProps {
  items: SidebarNavItem[];
  children: React.ReactNode;
  LinkRenderer?: any;
  logo?: string;
  userMenu: UserMenuProps;
  onLogout?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  enableSwitch?: boolean;
  students?: any[];
}

export interface LinkRendererProps {
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  [x: string]: any;
}

const findParentTitleByPath = (
  items: SidebarNavItem[],
  currentPath: string,
  parentTitle: string | undefined = undefined
): string | undefined => {
  for (const item of items) {
    if (item.href === currentPath) {
      return parentTitle;
    }
    if (item.items) {
      const foundTitle = findParentTitleByPath(
        item.items,
        currentPath,
        item.title
      );
      if (foundTitle) {
        return foundTitle;
      }
    }
  }
  return undefined;
};

const Sidebar: FC<SidebarProps> = ({
  items,
  LinkRenderer = (props: LinkRendererProps) => <a {...props} />,
  logo = "/logo-white.svg",
}) => {
  const [currentPath, setCurrentPath] = useState<string | undefined>(undefined);
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const pathname = window.location.pathname;

    setCurrentPath(pathname ? pathname : "/");
    const activeLink = findParentTitleByPath(items, pathname, "");
    setActiveAccordion(activeLink ? activeLink : "");
  }, [items]);

  return (
    <div
      className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4"
      data-testid="sidebar"
    >
      <LinkRenderer href="/" className={cn("flex h-16 shrink-0 items-center")}>
        <img className={cn("h-8 w-auto")} src={logo} alt="Progress Teaching" />
      </LinkRenderer>
      {currentPath && activeAccordion !== undefined && (
        <nav className="flex flex-1 flex-col">
          <SidebarNavs
            items={items}
            LinkRenderer={LinkRenderer}
            currentPath={currentPath}
            activeAccordion={activeAccordion}
          />
        </nav>
      )}
    </div>
  );
};

const Layout: FC<LayoutProps> = ({
  items,
  children,
  LinkRenderer = (props: LinkRendererProps) => <a {...props} />,
  logo,
  userMenu,
  onLogout,
  enableSwitch,
  students,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <Sidebar
                    logo={logo}
                    items={items}
                    LinkRenderer={LinkRenderer}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <Sidebar logo={logo} items={items} LinkRenderer={LinkRenderer} />
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              data-testid="menu-button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <SwitchChild
              students={students}
              variant="primary"
              current_student_id="8a613b2e-4346-4d59-8443-b790bc785034"
            />

            <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {userMenu?.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={userMenu?.avatar}
                        alt=""
                      />
                    ) : (
                      <svg
                        className="h-8 w-8 rounded-full text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {userMenu?.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userMenu?.navs &&
                        userMenu?.navs?.map((item, idx) => (
                          <Menu.Item key={idx}>
                            {({ active }) => (
                              <LinkRenderer
                                href={item.href}
                                className={cn(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                {item.title}
                              </LinkRenderer>
                            )}
                          </Menu.Item>
                        ))}
                      <Menu.Button
                        onClick={onLogout}
                        className="w-full text-start px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                      >
                        Log Out
                      </Menu.Button>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export { Layout };
