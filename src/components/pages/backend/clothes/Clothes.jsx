import { Plus } from "lucide-react";
import React from "react";
import SearchBar from "../partials/SearchBar";
import ToastSuccess from "../partials/ToastSuccess";
import ModalError from "../partials/Modals/ModalError";
import ModalValidation from "../partials/Modals/ModalValidation";
import ClothesTable from "./ClothesTable";
import { StoreContext } from "../../../store/storeContext";
import { setIsAdd } from "../../../store/storeAction";
import SideNavigation from "../partials/SideNavigation";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ModalAddClothes from "./ModalAddClothes";

const Clothes = () => {
    const { dispatch, store } = React.useContext(StoreContext);
    const [itemEdit, setItemEdit] = React.useState(null);
    const handleAdd = () => {
      dispatch(setIsAdd(true));
      setItemEdit(null);
    };
  return (
    <>
      <section className="layout-main">
        <div className="layout-div">
          <SideNavigation menu="clothes" />
          <main>
            <Header title="Clothes" subtitle="Manage Clothing Items" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} /> Add New
                </button>
              </div>
              <ClothesTable setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddClothes itemEdit={itemEdit} />}
    </>
  );
};

export default Clothes;
