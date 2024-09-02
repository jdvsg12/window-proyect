import { Routes, Route } from "react-router-dom"
import Home from "@/components/containers/home"
import Calculator from "@/components/containers/calculator"

function App() {

  return (
    <main className="max-w-[1400px] mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </main>
  )
}

export default App
