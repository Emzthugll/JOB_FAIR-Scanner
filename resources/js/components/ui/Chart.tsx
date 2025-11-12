import * as React from "react";

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: any; 
  cursor?: boolean;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};



export function ChartTooltip({ content, cursor }: { content: React.ReactNode; cursor?: boolean }) {
  return <>{content}</>;
}


export function ChartTooltipContent({ hideLabel }: { hideLabel?: boolean }) {
  return null; // placeholder
}


