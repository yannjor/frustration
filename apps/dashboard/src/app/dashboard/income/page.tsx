// 🔩 Base
import { useState, useEffect } from "react";

// 💥 Fetch
import { getTransactionsByMonth } from "./_actions";

// 🧱 Components
import { TabGroup, TabPanels } from "@/ui/components/tabs";
import TabList from "./_components/TabList";
import TabPanel from "./_components/TabPanel";

// 🔧 Libs
import { groupByMonthAndSum } from "./_utils";

// 🗿 Models
import { type Tab as TabType, TransactionType } from "./_models";

// 📦 Data
const tabs: TabType[] = [
  { name: "Tout", transactionsTypes: ["subscription", "donation"] },
  { name: "Abonnements", transactionsTypes: ["subscription"] },
  { name: "Dons", transactionsTypes: ["donation"] },
];

// 🧰 Config
export const dynamic = "force-dynamic";

export default async () => {
  const transactionsByMonth = await getTransactionsByMonth();
  return (
    <TabGroup className='w-full p-8'>
      <TabList tabs={tabs} />
      <TabPanels className='mx-auto w-full'>
        {tabs.map(({ name, transactionsTypes }) => {
          const multipleTransactionsTypes = transactionsTypes.length > 1;
          let filteredTransactionsByMonth = transactionsByMonth.filter(({ type }) =>
            transactionsTypes.includes(type),
          );
          if (multipleTransactionsTypes)
            filteredTransactionsByMonth = groupByMonthAndSum(filteredTransactionsByMonth);
          return (
            <TabPanel key={name} name={name} transactionsByMonth={filteredTransactionsByMonth} />
          );
        })}
      </TabPanels>
    </TabGroup>
  );
};
