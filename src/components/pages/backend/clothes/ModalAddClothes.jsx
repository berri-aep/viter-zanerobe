import React from "react";
import ModalWrapper from "../partials/Modals/ModalWrapper";
import { ImagePlusIcon, X } from "lucide-react";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import { setError, setIsAdd, setMessage, setSuccess } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import * as Yup from "Yup";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { Form, Formik } from "formik";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
} from "../helpers/FormInputs";
import { imgPath } from "../helpers/function-general";
import useQueryData from "@/components/custom-hook/useQueryData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";

const ModalAddClothes = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const { uploadPhoto1, handleChangePhoto1, photo1} =
    useUploadPhoto("/v2/upload-photo");

  const { uploadPhoto2, handleChangePhoto2, photo2 } =
    useUploadPhoto("/v2/upload-photo");

  const [value, setValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    isFetching,
    error,
    data: categ,
    status,
  } = useQueryData(
    `/v2/category`, //endpoint
    "get", //method
    "category" //key
  );

    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (values) =>
        queryData(
          itemEdit ? `/v2/clothes/${itemEdit.clothes_aid}` : "/v2/clothes",
          itemEdit ? "PUT" : "POST",
          values
        ),
      onSuccess: (data) => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["clothes"] });
  
        // show error box
        if (!data.success) {
          dispatch(setError(true));
          dispatch(setMessage(data.error));
          dispatch(setSuccess(false));
        } else {
          console.log("Success");
          dispatch(setIsAdd(false));
          dispatch(setSuccess(true));
        }
      },
    });

  const initVal = {
    clothes_title: itemEdit ? itemEdit.clothes_title : "",
    clothes_price: itemEdit ? itemEdit.clothes_price : "",
    clothes_size: itemEdit ? itemEdit.clothes_size : "",
    clothes_category_id: itemEdit ? itemEdit.clothes_category_id : "",
  };

  const yupSchema = Yup.object({
    clothes_title: Yup.string().required("* Required"),
    clothes_price: Yup.string().required("* Required"),
    clothes_size: Yup.string().required("* Required"),
    clothes_category_id: Yup.string().required("* Required"),
  });
  return (
    <>
      <ModalWrapper>
        <div className="modal-side fixed absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Clothe</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                clothes_image1:
                  (itemEdit?.clothes_image1 === "" && photo1) ||
                  (!photo1 && "") ||
                  (photo1 === undefined && "") ||
                  (photo1 && itemEdit?.clothes_image1 !== photo1?.name)
                    ? photo1?.name || ""
                    : itemEdit?.clothes_image1 || "",

                clothes_image2:
                  (itemEdit?.clothes_image2 === "" && photo2) ||
                  (!photo2 && "") ||
                  (photo2 === undefined && "") ||
                  (photo2 && itemEdit?.clothes_image2 !== photo2?.name)
                    ? photo2?.name || ""
                    : itemEdit?.clothes_image2 || "",
              });
              uploadPhoto1();
              uploadPhoto2();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] h-full overflow-y-auto custom-scroll">

                      {/* photo1 */}
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] mb-10 ">
                        <label htmlFor="">Photo 1</label>
                        {itemEdit === null && photo1 === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo1
                                ? URL.createObjectURL(photo1) // preview
                                : imgPath + "/" + itemEdit?.clothes_image1 // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto1(e)}
                          onDrop={(e) => handleChangePhoto1(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full`}
                        />
                      </div>

                      {/* photo2 */}
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo 2</label>
                        {itemEdit === null && photo2 === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo2
                                ? URL.createObjectURL(photo2) // preview
                                : imgPath + "/" + itemEdit?.clothes_image2 // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto2(e)}
                          onDrop={(e) => handleChangePhoto2(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full`}
                        />
                      </div>
                      <div className="input-wrap mt-10">
                        <InputText
                          label="Title"
                          type="text"
                          name="clothes_title"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          name="clothes_price"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Size"
                          type="text"
                          name="clothes_size"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Category"
                          name="clothes_category_id"
                          onChange={handleChange}
                        >
                          <option value="" hidden>
                            Select Category
                          </option>
                          {categ?.data.map((item, key) => {
                            return (
                              <>
                                {item.category_is_active === 1 && (
                                  <option key={key} value={item.category_aid}>
                                    {item.category_title}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </InputSelect>
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-5">
                      <button className="btn btn-accent" type="submit">
                        <SpinnerButton />
                        Save
                      </button>
                      <button
                        className="btn btn-cancel"
                        onClick={handleClose}
                        type="reset"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddClothes;
