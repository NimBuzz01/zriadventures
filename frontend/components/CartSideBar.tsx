"use client";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import NotFoundLabel from "./NotFoundLabel";
import MainButton from "./common/MainButton";
import { getExperienceTotal } from "@/contexts/experience-context";
import { useLocal } from "@/contexts/local-context";
import ExperienceSideCartCard from "./cards/sidecartcards/ExperienceSideCartCard";
import EventSideCartCard from "./cards/sidecartcards/EventSideCartCard";
import MerchandiseSideCartCard from "./cards/sidecartcards/MerchandiseSideCartCard";
import VoucherSideCartCard from "./cards/sidecartcards/VoucherSideCartCard";
import { calcOffer } from "@/lib/utils/func";
import RentalSideCartCard from "./cards/sidecartcards/RentalSideCartCard";

const CartSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);
  const { local, key } = useLocal();

  // Calculate the total price from cartItems
  const [totalPrice, setTotalPrice] = useState({ USD: 0, LKR: 0 });

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("Cart");
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Failed to parse cart items:", error);
      }
    }
  }, [key]);

  const handleDeleteItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("Cart", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    let total = { USD: 0, LKR: 0 };

    cartItems.forEach((item) => {
      if (item.itemType === "EXPERIENCE") {
        // Calculate total for EXPERIENCE items
        total.USD += getExperienceTotal(
          item.item.experience,
          item.item.duration,
          item.item.adults,
          item.item.children,
          item.item.extras
        ).USD;
        total.LKR += getExperienceTotal(
          item.item.experience,
          item.item.duration,
          item.item.adults,
          item.item.children,
          item.item.extras
        ).LKR;
      } else if (item.itemType === "EVENT") {
        // Calculate total for EVENT items
        total.USD += item.item.info.pax * item.item.event.cost.USD;
        total.LKR += item.item.info.pax * item.item.event.cost.LKR;
      } else if (item.itemType === "MERCHANDISE") {
        if (item.item.merchandise.offer) {
          total.USD += calcOffer(
            item.item.selectedOption.cost.USD * item.item.quantity,
            item.item.merchandise.offer
          );
          total.LKR += calcOffer(
            item.item.selectedOption.cost.LKR * item.item.quantity,
            item.item.merchandise.offer
          );
        } else {
          total.USD += item.item.selectedOption.cost.USD * item.item.quantity;
          total.LKR += item.item.selectedOption.cost.LKR * item.item.quantity;
        }
      } else if (item.itemType === "RENTAL") {
        total.USD += item.item.selectedOption.cost.USD * item.item.quantity;
        total.LKR += item.item.selectedOption.cost.LKR * item.item.quantity;
      } else if (item.itemType === "VOUCHER") {
        if (item.item.voucher.voucherType === "Cash") {
          if (item.item.voucher.voucherAmount?.currency === "LKR") {
            total.LKR += item.item.voucher.voucherAmount?.amount;
          } else if (item.item.voucher.voucherAmount?.currency === "USD") {
            total.USD += item.item.voucher.voucherAmount?.amount;
          }
        } else if (
          item.item.voucher.voucherType === "Experience" &&
          item.item.voucher.voucherExperience?.item.experience
        ) {
          const experienceTotalItem = getExperienceTotal(
            item.item.voucher.voucherExperience?.item.experience,
            item.item.voucher.voucherExperience?.item.duration,
            item.item.voucher.voucherExperience?.item.adults,
            item.item.voucher.voucherExperience?.item.children,
            item.item.voucher.voucherExperience?.item.extras
          );

          total.USD += experienceTotalItem.USD;
          total.LKR += experienceTotalItem.LKR;
        }
      }
    });

    setTotalPrice(total);
  }, [cartItems]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  return (
    <>
      <button
        className="relative text-2xl text-white transition-all hover:text-blue-500"
        onClick={handleOpen}
        key={key}
      >
        <AiOutlineShoppingCart />
        {cartItems.length > -1 && (
          <span
            key={cartItems.length}
            className="absolute -bottom-1.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs text-white"
          >
            {cartItems.length}
          </span>
        )}
      </button>
      <div
        className={`fixed right-0 top-0 z-[1000] flex h-screen w-full flex-col bg-gray-50 px-2 py-6 transition-all sm:px-6 md:w-[500px] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="mx-2 flex items-center justify-between border-b-2 border-gray-200 pb-2">
          <h2 className="text-xl font-semibold text-blue-950">My Cart</h2>
          <div className="flex justify-end">
            <button
              className="rounded-lg text-2xl text-blue-950 transition-all hover:bg-gray-100/80"
              onClick={handleClose}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-800">
          {cartItems.length === 0 ? (
            <NotFoundLabel text="No items in the cart." />
          ) : (
            cartItems.map((item) => (
              <div key={item.item.id}>
                {item.itemType === "EXPERIENCE" ? (
                  <ExperienceSideCartCard
                    item={item}
                    onDelete={handleDeleteItem}
                  />
                ) : item.itemType === "EVENT" ? (
                  <EventSideCartCard item={item} onDelete={handleDeleteItem} />
                ) : item.itemType === "MERCHANDISE" ? (
                  <MerchandiseSideCartCard
                    item={item}
                    onDelete={handleDeleteItem}
                  />
                ) : item.itemType === "RENTAL" ? (
                  <RentalSideCartCard item={item} onDelete={handleDeleteItem} />
                ) : item.itemType === "VOUCHER" ? (
                  <VoucherSideCartCard
                    item={item}
                    onDelete={handleDeleteItem}
                  />
                ) : null}
              </div>
            ))
          )}
        </div>
        <div className="mt-auto w-full">
          <div className="flex justify-end border-t-2 border-gray-200">
            <div className="my-3 flex items-end gap-2 text-blue-950">
              <p className="text-sm">Total</p>
              <h5 className="text-xl font-semibold">
                {(totalPrice.LKR || totalPrice.USD) && (
                  <>
                    {local ? (
                      <>LKR {totalPrice.LKR.toFixed(2)}</>
                    ) : (
                      <>USD ${totalPrice.USD.toFixed(2)}</>
                    )}
                  </>
                )}
              </h5>
            </div>
          </div>
          <MainButton
            href="/cart"
            text="View Cart"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
