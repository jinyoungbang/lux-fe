"use client";
import { useState, useEffect } from "react";

type TabType = "assets" | "spendings" | "tags";

export default function TransactionList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("assets"); // Set the initial active tab

  const tabLabels = {
    assets: "Assets",
    spendings: "Spendings",
    tags: "Tags",
  };

  const tabStyles = {
    active: "text-blue-600 border-blue-600 border-b-2 active dark:text-blue-500 dark:border-blue-500",
    inactive: "border-transparent dark:border-transparent",
  };

  const getTabClass = (tab: keyof typeof tabLabels, activeTab: string) => {
    return activeTab === tab ? tabStyles.active : tabStyles.inactive;
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedRow(null);
  };

  const TransactionTab = () => {
    return (
      <ul className="flex flex-wrap mb-px">
        {Object.keys(tabLabels).map((tabKey) => {
          const tab = tabKey as keyof typeof tabLabels;
          return (
            <li key={tabKey} className="mr-2">
            <a 
              href="#"
              className={`inline-block p-4 border-b-2 rounded-t-lg ${getTabClass(tab, activeTab as TabType)}`}
              onClick={() => handleTabClick(tab as TabType)}
            >
              {tabLabels[tabKey as keyof typeof tabLabels]}
            </a>
            </li>
          )})}
      </ul>
    )
  }

  return (
    <div className="min-w-full">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <TransactionTab />
      </div>
      <ul className="flex flex-col">
      </ul>
    </div>
  );
}

