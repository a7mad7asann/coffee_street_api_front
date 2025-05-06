import Hero from "../sections/Hero";
import PopProduct from "../sections/PopularProduct";
import About from "../sections/About";
import SpecialMenu from "../sections/SpecialMenu";
// import ToastTest from "../component/ToastTest";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden ">

        <Hero />
        <PopProduct />
        <About />
        <SpecialMenu />
        {/* <Mques /> */}
        {/* <Gallery /> */}
        {/* <Form /> */}
      </div>
       
    </>
  );
}
