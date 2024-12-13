import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import Pills from "../partials/Pills";
import LoadMore from "../partials/LoadMore";
import { StoreContext } from "@/components/store/storeContext";
import { setIsAdd, setIsArchive, setIsDelete, setIsRestore } from "@/components/store/storeAction";
import { clothes } from "./DataClothes";
import useQueryData from "@/components/custom-hook/useQueryData";
import TableLoader from "../partials/TableLoader";
import IconNoData from "../partials/IconNoData";
import IconServerError from "../partials/IconServerError";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import ModalArchive from "@/components/partials/modal/ModalArchive";

const ClothesTable = ({setItemEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  let counter = 1;

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

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.clothes_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.clothes_aid);

  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setId(item.clothes_aid);

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
                <th>Category</th>
                <th>Price</th>
                <th>Size</th>
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
                      <Pills isActive={item.clothes_is_active} />
                    </td>
                    <td>{item.clothes_title}</td>
                    <td>{item.category_title}</td>
                    <td>{item.clothes_price}</td>
                    <td>{item.clothes_size}</td>
                    <td>
                      <ul className="table-action">
                        {item.clothes_is_active ? (
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
          queryKey="clothes"
          mysqlApiDelete={`/v2/clothes/${id}`}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey="clothes"
          mysqlEndpoint={`/v2/clothes/active/${id}`}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey="clothes"
          mysqlEndpoint={`/v2/clothes/active/${id}`}
        />
      )}
    </>
  );
};

export default ClothesTable;
