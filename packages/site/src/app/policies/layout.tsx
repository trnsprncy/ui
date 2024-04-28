import React from "react";

export default function Policylayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose invert max-w-4xl w-full mx-auto my-12">
      {children}
    </div>
  );
}
