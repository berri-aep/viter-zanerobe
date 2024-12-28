import useQueryData from "@/components/custom-hook/useQueryData";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import IconNoData from "../partials/IconNoData";
import SideNavigation from "../partials/SideNavigation";
import TableLoader from "../partials/TableLoader";
import DashboardAccordion from "./DashboardAccordion";
import DashboardCard from "./DashboardCard";
import { getCategoryPrices } from "./function";

const Dashboard = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  const {
    isLoading: isLaodingCategory,
    isFetching: isFetchingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useQueryData(
    `/v2/category`, // endpoint
    "get", // method
    "category"
  );
  const {
    isLoading: isLaodingClothes,
    isFetching: isFetchingClothes,
    error: errorClothes,
    data: dataClothes,
  } = useQueryData(
    `/v2/clothes`, //endpoint
    "get", //method
    "clothes" //key
  );

  const tableData = getCategoryPrices(dataCategory, dataClothes);

  return (
    <>
      <section className="layout-main">
        <div className="layout-div">
          <SideNavigation menu="dashboard" />
          <main>
            <Header title="Dashboard" subtitle="Welcome to Clothes" />
            <div className="p-5 overflow-y-auto custom-scroll">
              <div className="grid grid-cols-[1fr_400px] gap-5">
                <div className="stats">
                  <div className="relative chart mt-2 pb-20">
                    {(isFetchingCategory || isFetchingClothes) &&
                      !isLaodingCategory &&
                      !isLaodingClothes && <FetchingSpinner />}
                    {isLaodingCategory || isLaodingClothes ? (
                      <TableLoader cols={1} count={15} />
                    ) : (
                      <>
                        <ResponsiveContainer width="100%" height={340}>
        <BarChart
          width={500}
          height={300}
          data={tableData.slice(0, 10)}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category_title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clothe_price" stackId="a" fill="#7FFFD4"  barSize={70} />
        </BarChart>
      </ResponsiveContainer>
                      </>
                    )}
                  </div>
                  <div className="relative">
                    {isFetchingCategory && !isLaodingCategory && (
                      <FetchingSpinner />
                    )}
                    {isLaodingCategory && <TableLoader cols={4} count={20} />}
                    {dataCategory?.count === 0 && <IconNoData />}
                    <div className="grid grid-cols-4 gap-5 mt-2 custom-scroll overflow-y-auto  h-[calc(100vh-600px)]">
                      {dataCategory?.data.map((item, key) => {
                        return (
                          <DashboardCard
                            item={item}
                            key={key}
                            dataClothes={dataClothes}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="sidebar custom-scroll overflow-auto h-[calc(100vh-160px)]">
                  <div className="relative">
                    {isFetchingCategory && !isLaodingCategory && (
                      <FetchingSpinner />
                    )}
                    {isLaodingCategory && <TableLoader cols={1} count={20} />}
                    {dataCategory?.count === 0 && <IconNoData />}
                    {dataCategory?.count > 0 &&
                      dataCategory?.data.map((item, key) => {
                        const clothesItem = dataClothes?.data.filter(
                          (clothesItem) =>
                            clothesItem.clothes_category_id == item.category_aid
                        );
                        
                        return (
                          <DashboardAccordion
                            item={item}
                            key={key}
                            clothesItem={clothesItem}
                            
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </main>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
