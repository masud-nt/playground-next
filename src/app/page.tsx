"use client";
import FilterComp from "@/components/FilterComp";
import TabsComponent from "@/components/Tabs";
import { useState } from "react";

const DemoContent = () => {
  return <div>Billing Content</div>;
};

const tabs = [
  { name: "My Account", content: <div>Account Content</div> },
  { name: "Company", content: "Company Content" },
  { name: "Team Members", content: "Members Content" },
  { name: "Billing", content: <DemoContent /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("My Account");
  return (
    <div className="p-4">
      <FilterComp />
    </div>
  );
}
