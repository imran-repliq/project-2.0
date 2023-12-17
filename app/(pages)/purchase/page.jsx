"use client";

import ApiKit from "@/common/helpers/APIKit";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const {
    data: procures,
    refetch: refetchProcure,
    isLoading,
  } = useQuery({
    queryKey: [`/procures`],
    queryFn: () =>
      ApiKit.procurement.procures.getProcures().then(({ data }) => data),
  });
  console.log({ procures });
  console.log("called");
  if (isLoading) {
    return "Loading...";
  }
  const datas = procures.results;
  return (
    <div>
      {datas.map((item) => (
        <p key={item.id}>{item.id}</p>
      ))}
    </div>
  );
}
