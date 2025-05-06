import { useState, useEffect } from "react";
import BuildingLoader from "./component/BuildingLoader.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./component/Navbarr";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./sections/About";
import Products from "./pages/Products.jsx";
import Footer from "./component/Footer";
import { Toaster } from 'react-hot-toast'; // ⬅️ استيراد التوستر

function App() {
  return (
    <Router>
      <Nav />

      {/* ✅ مكون التوست لإظهار الرسائل في كل الصفحات */}
      <Toaster position="top-center" />

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/cart"     element={<Cart />} />
        <Route path="/about"    element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;


// import { useState, useEffect } from "react";
// import BuildingLoader from "./component/BuildingLoader.jsx"; 
// import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Nav from "./component/Navbarr";
// import Home from "./pages/Home.jsx";
// import Cart from "./pages/Cart.jsx"
// import About from "./sections/About";
// import Mques from "./sections/CTA";
// import Products from "./pages/Products.jsx";
// import Form from "./sections/Form";
// import Prtner from "./sections/PopularProduct.jsx";
// import { Toaster } from 'react-hot-toast'; // ⬅️ استيراد التوستر
// import Footer from "./component/Footer";

// function App() {
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     setLoading(false);
//   //   }, 2000); // مدة الانتظار (2 ثانية)
//   // }, []);

//   return (
//     //   <Router>
//     //     <BuildingLoader loading={loading} />
//     //     {!loading && (
//     //       <>
//     //         <Nav />
//     //         <Hero />
//     //         <Prtner />
//     //         <About />
//     //         <Mques />
//     //         <Gallery />
//     //         <Form />
//     //         <Footer />
//     //       </>
//     //     )}
//     //   </Router>

//       <Router>
//         <Nav />
        
//         <Toaster position="top-center" />

//         <Routes>
//           <Route path="/"         element={<Home    />} />
//           <Route path="/cart"     element={<Cart    />} />
//           <Route path="/about"    element={<About   />} />
//           <Route path="/cta"      element={<Mques   />} />
//           <Route path="/Products"  element={<Products />} />
//           <Route path="/form"     element={<Form    />} />
//           <Route path="/partners" element={<Prtner  />} />
//         </Routes>

//         {/* <Footer /> */}
//       </Router>
//   );
// }

// export default App;
