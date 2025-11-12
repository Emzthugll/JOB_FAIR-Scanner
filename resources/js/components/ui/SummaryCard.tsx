"use client";

import * as React from "react";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface SummaryCardProps {
  title?: string;
  footerText?: string;
  children?: React.ReactNode;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, footerText, children, className }) => {
  return (
    <UiCard className={`p-4 bg-gray-50 shadow-lg flex flex-col justify-between ${className}`}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold ">{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent className="flex-1 flex items-center justify-center">
        {children}
      </CardContent>

      {footerText && (
        <div className="text-center text-sm text-gray-500 pt-2">{footerText}</div>
      )}
    </UiCard>
  );
};

export default SummaryCard;
