import React from "react";
import ItemHeader from "./ItemHeader";
import { MerchandiseCart } from "@/types/merchandiseTypes";
import MerchandiseCartCard from "./cards/merchandise-cartcard";

interface Props {
  items: MerchandiseCart[];
  onDelete: (itemId: string) => void;
}

const MerchandiseItems = ({ items, onDelete }: Props) => {
  return (
    <>
      {items.length > 0 && (
        <div>
          <ItemHeader firstCol="Merchandise" />
          {items.map((item) => (
            <MerchandiseCartCard
              key={item.item.id}
              item={item}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MerchandiseItems;
