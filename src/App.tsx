import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"
import Index from "@/pages/Index"
import Auth from "@/pages/Auth"
import PropertyFormPage from "@/pages/PropertyForm"
import PropertyDetail from "@/pages/PropertyDetail"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/properties/new" element={<PropertyFormPage />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

export default App