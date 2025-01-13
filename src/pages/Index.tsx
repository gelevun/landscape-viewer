import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";

const mockProperties = [
  {
    id: 1,
    title: "Deniz Manzaralı İmarlı Arsa",
    location: "Bodrum, Muğla",
    price: 2500000,
    area: 500,
    type: "İmarlı Arsa",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  },
  {
    id: 2,
    title: "Yatırımlık Tarla",
    location: "Çeşme, İzmir",
    price: 1500000,
    area: 1000,
    type: "Tarla",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  },
  {
    id: 3,
    title: "Şehir Merkezinde İmarlı Arsa",
    location: "Urla, İzmir",
    price: 3500000,
    area: 750,
    type: "İmarlı Arsa",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hayalinizdeki Arsayı Bulun
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Türkiye'nin en kapsamlı arsa ve arazi ilan platformu
          </p>
          <SearchFilters />
        </div>
      </div>

      {/* Property Listings */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Öne Çıkan İlanlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;