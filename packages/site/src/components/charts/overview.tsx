"use client";

import metrics from "./data.json";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function prettifyCurrency(value: number): string {
  const suffixes = ["", "k", "m", "b", "t"];
  let index = 0;
  while (value >= 1000 && index < suffixes.length - 1) {
    value /= 1000;
    index += 1;
  }
  return (value.toFixed(1) + suffixes[index]).toString();
}

interface FineData {
  position: string;
  name: string;
  year: string;
  sum_euros: string;
  num_fines: string;
}

interface GroupedData {
  position?: string;
  name: string;
  year: string;
  sum_euros: string;
  num_fines: string;
}

function processData(data: FineData[]): (GroupedData | FineData)[] {
  const transformedData: (GroupedData | FineData)[] = [];

  for (const entry of data) {
    const { position, name, year, sum_euros: sumEuros, num_fines } = entry;

    // if (year === "2024") {
    //   // For the current year, keep the data as is and format the sum_euros without commas
    //   transformedData.push({
    //     position,
    //     name,
    //     year,
    //     sum_euros: sumEuros.replace(/,/g, ""),
    //     num_fines,
    //   });
    // } else {
    //   // For previous years, group the data by year
    const existingYearIndex = transformedData.findIndex(
      (item) => (item as GroupedData).year === year
    );
    if (existingYearIndex !== -1) {
      const existingYearData = transformedData[
        existingYearIndex
      ] as GroupedData;
      existingYearData["sum_euros"] = (
        parseFloat(existingYearData["sum_euros"].replace(/,/g, "")) +
        parseFloat(sumEuros.replace(/,/g, ""))
      ).toString();
      existingYearData.num_fines = (
        parseInt(existingYearData.num_fines) + parseInt(num_fines)
      ).toString();
    } else {
      transformedData.push({
        name: year,
        year,
        sum_euros: sumEuros,
        num_fines,
      });
    }
    // }
  }

  return transformedData;
}

const _data = processData(metrics).slice(0, -1); // removes the current year

function formatCurrency(value: string): string {
  const num = parseFloat(value.replace(/,/g, ""));
  const formattedValue = num.toLocaleString(undefined, {
    style: "currency",
    currency: "EUR", // Customize this if you need a different currency
  });

  // Replace the currency symbol if provided
  return formattedValue.slice(formattedValue.indexOf(" ") + 1);
}

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        data={_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          // @FIXME: any
          tickFormatter={prettifyCurrency}
        />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "hsla(var(--background)/0.6)",
            color: "currentColor",
            borderRadius: "4px",
            backdropFilter: "blur(4px)",
          }}
          formatter={(value, name, props) => {
            if (name === "sum_euros") {
              return formatCurrency(value as string);
            }
            return value;
          }}
        />

        <Bar
          dataKey="sum_euros"
          radius={[4, 4, 0, 0]}
          className="fill-blue-400 dark:fill-white"
          minPointSize={20}
        />
        {/* <Bar
          dataKey="num_fines"
          fill="pink"
          radius={[4, 4, 0, 0]}
          minPointSize={20}
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}
