import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import type { FilterState } from "@/components/SearchFilters";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";

const mockProperties = [
  {
    id: 1,
    title: "Deniz Manzaralı İmarlı Arsa",
    location: "Bodrum, Muğla",
    price: 2500000,
    area: 500,
    type: "İmarlı Arsa",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 2,
    title: "Yatırımlık Tarla",
    location: "Çeşme, İzmir",
    price: 1500000,
    area: 1000,
    type: "Tarla",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 3,
    title: "Şehir Merkezinde İmarlı Arsa",
    location: "Urla, İzmir",
    price: 3500000,
    area: 750,
    type: "İmarlı Arsa",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 4,
    title: "Denize Yakın Yatırımlık Arsa",
    location: "Fethiye, Muğla",
    price: 1800000,
    area: 600,
    type: "İmarlı Arsa",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 5,
    title: "Yatırıma Uygun Tarım Arazisi",
    location: "Alaçatı, İzmir",
    price: 2200000,
    area: 1500,
    type: "Tarla",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 6,
    title: "Merkezi Konumda Ticari İmarlı Arsa",
    location: "Bodrum, Muğla",
    price: 4500000,
    area: 850,
    type: "Ticari Arsa",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
];

const ITEMS_PER_PAGE = 6;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const { toast } = useToast();

  const handleFilterChange = (filters: FilterState) => {
    console.log("Applying filters:", filters);
    let filtered = [...mockProperties];

    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter((property) => property.type === filters.propertyType);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((property) => {
        if (max) {
          return property.price >= min && property.price <= max;
        }
        return property.price >= min;
      });
    }

    // Gelişmiş filtreler
    if (filters.landType !== "all") {
      filtered = filtered.filter((property) => {
        // Örnek olarak, arsa tipine göre filtreleme
        if (filters.landType === "flat") {
          return property.type.includes("İmarlı");
        } else if (filters.landType === "sloped") {
          return property.type.includes("Tarla");
        }
        return true;
      });
    }

    if (filters.registrationStatus !== "all-status") {
      // Tapu durumuna göre filtreleme (mock veri olmadığı için şimdilik atlandı)
      console.log("Tapu durumu filtresi:", filters.registrationStatus);
    }

    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "area-desc":
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        // 'newest' varsayılan sıralama
        break;
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);

    toast({
      title: "Filtreler uygulandı",
      description: `${filtered.length} ilan bulundu.`,
    });
  };

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hayalinizdeki Arsayı Bulun
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Türkiye'nin en kapsamlı arsa ve arazi ilan platformu
          </p>
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Öne Çıkan İlanlar</h2>
          <p className="text-muted-foreground">
            Toplam {filteredProperties.length} ilan bulundu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;