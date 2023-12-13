"use client";

export default function PageHeader({ heading }) {
  return (
    <div>
      <div className="bg-gray-200 p-6 w-full">
        <h3 className="text-2xl font-medium">{heading}</h3>
      </div>
    </div>
  );
}
