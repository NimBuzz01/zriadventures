"use client";
import React, { useEffect, useState } from "react";
import MainHeader from "@/components/common/MainHeader";
import { MerchandiseTypes } from "@/types/merchandiseTypes";
import MerchandiseCard from "@/components/cards/MerchandiseCard";
import MerchandiseFilters from "./MerchandiseFilters";
import { useDataContext } from "@/contexts/data-context";
import NotFoundLabel from "@/components/NotFoundLabel";
import { useLocal } from "@/contexts/local-context";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";

const MerchandiseStore = () => {
  const { merchandise } = useDataContext();
  const { local } = useLocal();
  const router = useRouter();

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showOffers, setShowOffers] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(local ? 200000 : 200);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Filter experiences based on the search query and selected filters
  const filteredMerchandise = merchandise.filter((merch: MerchandiseTypes) => {
    const matchesSearchQuery = merch.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? merch.category.id === selectedCategory
      : true;
    const hasOffer = showOffers ? merch.offer : true;
    const convertToLowestPrice = (rates: any, local: boolean) => {
      const lowestPrice = Math.min(rates[local ? "LKR" : "USD"]);

      return lowestPrice;
    };

    const matchesPriceRange = merch.options.option.some((option) => {
      const rates = option.cost;
      const lowestPrice = convertToLowestPrice(rates, local);

      return lowestPrice >= minPrice && lowestPrice <= maxPrice;
    });

    return (
      matchesSearchQuery && matchesCategory && hasOffer && matchesPriceRange
    );
  });

  const totalPages = Math.ceil(filteredMerchandise.length / itemsPerPage);

  const handlePagination = (pageNumber: number) => {
    if (pageNumber === -1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMerchandise = filteredMerchandise.slice(startIndex, endIndex);

  return (
    <div
      className="flex flex-col items-center justify-center w-full px-2 py-10 sm:px-10"
      id="#merchandise-store-items"
    >
      <MainHeader subtitle="Our Merchandise" title="Our Merchandise Catalog" />
      <div className="w-full border-t-2 border-gray-200"></div>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="mb-5 w-full lg:mb-0 lg:w-[500px]">
          <MerchandiseFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showOffers={showOffers}
            setShowOffers={setShowOffers}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
        <div className="flex flex-col items-center w-full px-2">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          {currentMerchandise.length > 0 ? (
            <div
              className="flex flex-wrap items-center justify-center gap-4 py-4"
              id="experience-store-items"
            >
              {currentMerchandise.map((merchandise: MerchandiseTypes) => (
                <MerchandiseCard
                  key={merchandise.id}
                  merchandise={merchandise}
                  width="w-72"
                />
              ))}
            </div>
          ) : (
            <NotFoundLabel text="Sorry! No search results found" />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default MerchandiseStore;
