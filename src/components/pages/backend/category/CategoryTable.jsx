import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/components/store/storeAction";

import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import LoadMore from "../partials/LoadMore";
import ModalConfirm from "../partials/Modals/ModalConfirm";
import Pills from "../partials/Pills";
import { StoreContext } from "@/components/store/storeContext";
import useQueryData from "@/components/custom-hook/useQueryData";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import IconNoData from "../partials/IconNoData";
import TableLoader from "../partials/TableLoader";
import IconServerError from "../partials/IconServerError";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalDelete from "@/components/partials/modal/ModalDelete";

const CategoryTable = ({setItemEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  let counter = 1;
  const [id, setId] = React.useState(null);


    const {
      isLoading,
      isFetching,
      error,
      data: result,
    } = useQueryData(
      `/v2/category`, // endpoint
      "get", // method
      "category"
    );

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.category_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.category_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setId(item.category_aid);
  };
  return (
    <>
      <div className="p-4 bg-secondary rounded-md mt-10 border border-line relative">
        {!isLoading || (isFetching && <SpinnerTable />)}
        <div className="table-wrapper custom-scroll">
          {/* <TableLoader count={20} cols={5} /> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {((isLoading && !isFetching) || result?.data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {isLoading ? (
                      <TableLoader count={30} cols={6} />
                    ) : (
                      <IconNoData />
                    )}
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="100%">
                    <IconServerError />
                  </td>
                </tr>
              )}
              {result?.data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{counter++}.</td>
                    <td>
                      <Pills isActive={item.category_is_active} />
                    </td>
                    <td>{item.category_title}</td>
                    <td>
                      <ul className="table-action">
                        {item.category_is_active ? (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FilePenLine />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <Archive />
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Restore"
                              >
                                <ArchiveRestore
                                  onClick={() => handleRestore(item)}
                                />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <Trash2 />
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <LoadMore />
        </div>
      </div>

      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey="category"
          mysqlApiDelete={`/v2/category/${id}`}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey="category"
          mysqlEndpoint={`/v2/category/active/${id}`}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey="category"
          mysqlEndpoint={`/v2/category/active/${id}`}
        />
      )}
    </>
  );
};

export default CategoryTable;
