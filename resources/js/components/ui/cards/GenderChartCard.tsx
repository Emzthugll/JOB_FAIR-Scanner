"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { PieChart, Pie, Label, Tooltip, Cell } from "recharts";

interface GenderChartCardProps {
  title: string;
  maleCount: number;
  femaleCount: number;
}

const GenderChartCard: React.FC<GenderChartCardProps> = ({ title, maleCount, femaleCount }) => {
  const chartData = [
    { label: "Male", value: maleCount, fill: "#3b82f6" },    
    { label: "Female", value: femaleCount, fill: "#ec4899" }, 
  ];

  const totalScanned = maleCount + femaleCount;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center ">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={70}
            outerRadius={100}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <Label
              position="center"
              content={() => (
                <text
                  x={125}
                  y={125}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold fill-foreground"
                >
                  <tspan x={125} dy={0}>{totalScanned}</tspan>
                  <tspan x={125} dy={24} className="text-base font-normal">Total Scanned</tspan>
                </text>
              )}
            />
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, name]}
          />
        </PieChart>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <span>Total scanned attendees</span>
        <div className="flex gap-4 mt-1">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
            <span>Male {maleCount} </span>
            
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span>
            <span>Female {femaleCount}</span>
            
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GenderChartCard;
