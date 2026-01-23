import { fetchPromotions } from "@/app/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from "react";

export const PromotionsSelector = (props: { selectedPromotionId: string, setSelectedPromotionId: Dispatch<SetStateAction<string>>, setNewPromotionName: Function }) => {

  const { data, isPending, error } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => await fetchPromotions(),
  });

  if (isPending) return (
    <div className="my-2 space-y-2 flex flex-col items-center justify-center">
      <Select>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Loading promotions...&nbsp;&nbsp;" />
        </SelectTrigger>
      </Select>
    </div>
  )

  if (error) return (
    <div className="my-2 space-y-2 flex flex-col items-center justify-center">
      <Select>
        <SelectTrigger className="w-full max-w-48 ring-red-500">
          <SelectValue placeholder={`Error loading promotions! ${error.message}`} />
        </SelectTrigger>
      </Select>
    </div>
  )

  return (
    <div className="my-2 space-y-2 flex flex-col items-center justify-center">
      <Select onValueChange={props.setSelectedPromotionId}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a promotion...&nbsp;&nbsp;" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Promotion</SelectLabel>
            <SelectItem value={"0"}>Select a promotion...</SelectItem>
            {data.map((item: any) => <SelectItem value={item.id} key={item.id}>{item.name}</SelectItem>)}
            <SelectItem value={"1"}>+ Create New</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {props.selectedPromotionId === "1" && <Input className="" onChange={(e) => props.setNewPromotionName(e.target.value)} />}
    </div>
  )
}
