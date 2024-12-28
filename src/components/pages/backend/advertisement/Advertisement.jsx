import { Plus } from 'lucide-react';
import React from 'react'
import Footer from '../partials/Footer';
import SideNavigation from '../partials/SideNavigation';
import Header from '../partials/Header';
import SearchBar from '../partials/SearchBar';
import AdvertisementTable from './AdvertisementTable';
import { StoreContext } from '@/components/store/storeContext';
import { setIsAdd } from '@/components/store/storeAction';
import ModalAddAdvertisement from './ModalAddAdvertisement';
import ToastSuccess from '../partials/ToastSuccess';
import ModalError from '../partials/Modals/ModalError';
import ModalValidation from '../partials/Modals/ModalValidation';

const Advertisement = () => {
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
          <SideNavigation menu="advertisement" />
          <main>
            <Header
              title="Advertisement"
              subtitle="Manage Advertisement"
            />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} /> Add New
                </button>
              </div>
              <AdvertisementTable setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.validate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      {store.isAdd && <ModalAddAdvertisement itemEdit={itemEdit} />}
    </>
  );
}

export default Advertisement