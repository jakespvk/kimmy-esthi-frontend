import { fetchPromotions } from "@/app/api";
import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

export const PromotionsSelector = (props: { setPromotionName: Function }) => {
  const [showCreatePromotion, setShowCreatePromotion] = useState(false);

  const { data, isPending, error } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => await fetchPromotions(),
  });

  console.log(data);

  if (isPending) return <div>loading...</div>;

  if (error) return <div>error! {error.message}</div>;

  return (
    <div className="my-2 space-y-2 flex flex-col items-center justify-center">
      {data.map((item: any) => <button key={item.id}>{item.name}</button>)}
      <button type="button" className="btn" onClick={() => setShowCreatePromotion(showCreatePromotion ? false : true)}>Create a new promotion</button>
      {showCreatePromotion && <Input className="" onChange={(e) => props.setPromotionName(e.target.value)} />}
    </div>
  )
}
