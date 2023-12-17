import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { LinkRendererProps } from "../Layout";
import { cn } from "@/lib/utils";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: SidebarNavItem[];
    }
);

export interface SidebarProps {
  items: SidebarNavItem[];
}

interface SidebarNavsProps {
  items: SidebarNavItem[];
  LinkRenderer?: any;
  currentPath: string;
  activeAccordion: string;
}

function SidebarNavs({
  items,
  currentPath,
  activeAccordion,
  LinkRenderer = (props: LinkRendererProps) => <a {...props} />,
}: SidebarNavsProps) {
  return items?.length ? (
    <div
      className="grid grid-flow-row auto-rows-max text-sm"
      data-testid="sidebar-items"
    >
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <LinkRenderer
            key={index}
            href={item.href}
            className={cn(
              item.href === currentPath
                ? "bg-black bg-opacity-20 text-gray-100 border"
                : "text-white hover:text-white hover:bg-black hover:bg-opacity-10 hover:border-primary",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold border border-transparent"
            )}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
          >
            {item.title}
          </LinkRenderer>
        ) : item?.items ? (
          <Accordion
            defaultValue={[activeAccordion]}
            key={index}
            type="multiple"
            className="w-full text-white"
          >
            <AccordionItem value={item?.title} className="border-0 py-0 my-0">
              <AccordionTrigger className="p-2 [&>svg]:text-white">
                {item?.title}
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                {item.items ? (
                  <SidebarNavs
                    items={item.items}
                    LinkRenderer={LinkRenderer}
                    currentPath={currentPath}
                    activeAccordion={activeAccordion}
                  />
                ) : null}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-white opacity-60"
          >
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null;
}

export { SidebarNavs };
