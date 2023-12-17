"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface ItemProps {
  name: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: ItemProps[];
  activeTab: string;
  onChange: (tabName: string) => void;
}

const TabsComponent = ({ tabs, activeTab, onChange }: TabsProps) => {
  const handleTabChange = (tabName: string) => {
    onChange(tabName);
  };
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>

        <select
          id="tabs"
          name="tabs"
          className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          defaultValue={activeTab}
          onChange={(e) => handleTabChange(e.target.value)}
        >
          {tabs.map((tab: any) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab: any) => (
              <button
                key={tab.name}
                className={cn(
                  activeTab === tab?.name
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                )}
                onClick={() => handleTabChange(tab.name)}
                aria-current={activeTab === tab?.name ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-2">
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabsComponent;
