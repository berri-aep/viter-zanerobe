import { CheckCircle } from "lucide-react";
import React from "react";
import { StoreContext } from "../../../store/storeContext";
import { setSuccess } from "../../../store/storeAction";

const ToastSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  React.useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccess(false));
    }, 2000);
  }, []);
  return (
    <>
      <div className="fixed top-10 left-1/2 -translate-x-1/2 border border-line bg-primary text-success rounded-md flex gap-2 items-center p-1.5 px-2.5">
        <CheckCircle size={16} />
        Record Successfully {store.message}!
      </div>
    </>
  );
};

export default ToastSuccess;
