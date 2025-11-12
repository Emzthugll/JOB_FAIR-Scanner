'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface LineChartCardProps {
  data: {
    month: string;
    totalAttendees: number;
    growthRate: number;
    activities: { name: string; count: number }[];
  }[];
  title: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ data, title }) => {
  return (
    <Card className="shadow-md rounded-2xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#084896]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === 'growthRate') return [`${value}%`, 'Growth Rate'];
                if (name === 'totalAttendees') return [value, 'Total Attendees'];
                return [value, name];
              }}
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                border: '1px solid #ccc',
              }}
              labelFormatter={(label, payload) => {
                const monthData = data.find((d) => d.month === label);
                if (!monthData) return label;
                return (
                  <div>
                    <strong>{label}</strong>
                    <br />
                    {monthData.activities.map((a) => (
                      <div key={a.name}>
                        {a.name}: {a.count}
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalAttendees"
              stroke="#084896"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Total Attendees"
            />
            <Line
              type="monotone"
              dataKey="growthRate"
              stroke="#22c55e"
              strokeDasharray="4 4"
              strokeWidth={2}
              name="Growth Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
