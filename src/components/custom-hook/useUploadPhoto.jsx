import React from "react";
import { setError, setMessage } from "../store/storeAction.jsx";
import { StoreContext } from "../store/storeContext.jsx";

const useUploadPhoto = (url) => {
  const [photo1, setPhoto1] = React.useState(null);
  const [photo2, setPhoto2] = React.useState(null);
  const { dispatch } = React.useContext(StoreContext);
  const uploadPhoto1 = async () => {
    // if (photo) {
    //   const fd = new FormData();
    //   fd.append("photo", photo);
    //   const data = await fetchFormData(devApiUrl + url, fd);
    // }
  };
  const uploadPhoto2 = async () => {
    // if (photo) {
    //   const fd = new FormData();
    //   fd.append("photo", photo);
    //   const data = await fetchFormData(devApiUrl + url, fd);
    // }
  };
  const handleChangePhoto1 = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setPhoto1("");
      dispatch(setError(false));
      dispatch(setMessage(""));
      return;
    }

    const img = e.target.files[0];
    if (img.size > 350000) {
      dispatch(setError(true));
      dispatch(
        setMessage(
          "Photo is too big. It should be less than 5Kb and 80x80px size for better result."
        )
      );
    } else {
      setPhoto1(img);
      dispatch(setError(false));
    }
  };
  const handleChangePhoto2 = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setPhoto2("");
      dispatch(setError(false));
      dispatch(setMessage(""));
      return;
    }

    const img = e.target.files[0];
    if (img.size > 350000) {
      dispatch(setError(true));
      dispatch(
        setMessage(
          "Photo is too big. It should be less than 5Kb and 80x80px size for better result."
        )
      );
    } else {
      setPhoto2(img);
      dispatch(setError(false));
    }
  };

  return { uploadPhoto1, uploadPhoto2, handleChangePhoto1, photo1, handleChangePhoto2, photo2};
};

export default useUploadPhoto;
