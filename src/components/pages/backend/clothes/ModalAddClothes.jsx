import React from "react";
import ModalWrapper from "../partials/Modals/ModalWrapper";
import { ImagePlusIcon, X } from "lucide-react";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import { setIsAdd } from "@/components/store/storeAction";
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

const ModalAddClothes = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  console.log(itemEdit);

  const initVal = {
    clothe_title: itemEdit ? itemEdit.clothe_title : "",
    clothe_price: itemEdit ? itemEdit.clothe_price : "",
    clothe_size: itemEdit ? itemEdit.clothe_size : "",
    clothe_category: itemEdit ? itemEdit.clothe_category : "",
  };

  const yupSchema = Yup.object({
    clothe_title: Yup.string().required("* Required"),
    clothe_price: Yup.string().required("* Required"),
    clothe_size: Yup.string().required("* Required"),
    clothe_category: Yup.string().required("* Required"),
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
              console.log(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo</label>
                        {itemEdit === null ? (
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
                              itemEdit === null
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.clothe_image // check db
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
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full`}
                        />
                      </div>
                      <div className="input-wrap mt-10">
                        <InputText
                          label="Title"
                          type="text"
                          name="clothe_title"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          name="clothe_price"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Size"
                          type="text"
                          name="clothe_size"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect label="Category" name="clothe_category">
                          <option value="" hidden>
                            Select Category
                          </option>
                          <option value="Shirt">Shirt</option>
                          <option value="Pants">Pants</option>
                          <option value="Jacket">Jacket</option>
                          <option value="Shorts">Shorts</option>
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
