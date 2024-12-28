import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { imgPath } from "@/components/helpers/function-general";
import { Star } from "lucide-react";
import { newArrivalArray } from "../home/new-arrival-data";
import { useParams } from "react-router-dom";
import useQueryData from "@/components/custom-hook/useQueryData";

const ProductInfo = () => {
  const { slug } = useParams();
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v2/clothes`, // endpoint
    "get", // method
    "clothes"
  );

  const getProductInfo = result.filter((item) => item.clothes_slug === slug);
  console.log(getProductInfo);
  return (
    <>
      <Header />
      <section className="h-[50vh] bg-black bg-[url(http://localhost/vite-zanerobe/public/img/slide-1.jpg)]"></section>
      <section className="product-info">
        <div className="container">
          <div className="grid grid-cols-[1fr_400px] gap-5 mt-10">
            <main>
              <div className="flex gap-5">
                <img
                  src={`${imgPath}/${getProductInfo[0].clothes_image1}`}
                  alt=""
                  className="w-[49%]"
                />
                <img
                  src={`${imgPath}/${getProductInfo[0].clothes_image2}`}
                  alt=""
                  className="w-[49%]"
                />
              </div>
            </main>
            <aside>
              <div className="mt-24 text-black">
                <h3>{getProductInfo[0].clothes_title}</h3>
                <div className="flex gap-5 items-center">
                  <ul className="flex gap-1 my-2">
                    {Array.from(Array(getProductInfo[0].rating).keys()).map(
                      () => (
                        <li>
                          <Star fill={"black"} size={16} />
                        </li>
                      )
                    )}
                  </ul>
                  <p className="mb-0">reviews(100)</p>
                </div>
                <h5 className="text-base font-semibold mb-4">
                  Php {getProductInfo[0].clothes_price}
                </h5>
                <p className="mb-2">SKU-01276</p>
                <div className="thumbnails flex gap-2 rounded-md mb-6 flex-wrap">
                  {getProductInfo[0].thumbnails.map((item, key) => (
                    <img
                      src={`${imgPath}/${item}`}
                      alt=""
                      className="size-[100px] object-cover"
                      key={key}
                    />
                  ))}
                </div>

                <h5 className="text-sm font-semibold mb-2">Select Your Size</h5>
                <ul className="sizes flex gap-2">
                  {getProductInfo[0].clothes_size.map((item, key) => (
                    <li
                      className="w-[50px] h-[30px] border border-black center-all hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
                      key={key}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductInfo;
