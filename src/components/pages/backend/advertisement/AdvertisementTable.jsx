import { setIsAdd, setIsArchive, setIsDelete, setIsRestore } from "@/components/store/storeAction";

import {
    Archive,
    ArchiveRestore,
    FilePenLine,
    Trash2
} from "lucide-react";
import React from "react";
import LoadMore from "../partials/LoadMore";
import ModalConfirm from "../partials/Modals/ModalConfirm";
import Pills from "../partials/Pills";
import { StoreContext } from "@/components/store/storeContext";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import TableLoader from "../partials/TableLoader";
import IconNoData from "../partials/IconNoData";
import IconServerError from "../partials/IconServerError";
import useQueryData from "@/components/custom-hook/useQueryData";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import { useInView } from "react-intersection-observer";

const AdvertisementTable = ({setItemEdit}) => {
  const{store,dispatch} = React.useContext(StoreContext);
   const [id, setId] = React.useState(null);
   const [isFilter, setIsFilter] = React.useState(false);
   const [onSearch, setOnSearch] = React.useState(false);
   const [statusFilter, setStatusFilter] = React.useState("");
   const search = React.useRef({ value: "" });
   const [page, setPage] = React.useState(1);
   const { ref, inView } = useInView();
  let counter = 1;
  

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.adv_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.adv_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setId(item.adv_aid);
  };
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["adv", onSearch, isFilter, statusFilter],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "/v2/adv/search", // search or filter endpoint
        `/v2/adv/page/${pageParam}`, //page api/endpoint
        isFilter || store.isSearch, //search boolean
        {
          isFilter,
          statusFilter,
          searchValue: search?.current.value,
          id: "",
        } // payload
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
        ``;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
     <div>
        <SearchBarWithFilterStatus
          search={search}
          dispatch={dispatch}
          store={store}
          result={result}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setIsFilter={setIsFilter}
        />
      </div>
      <div className="p-4 bg-secondary rounded-md mt-10 border border-line relative">
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
            {(status === "pending" || result?.pages[0].data.length === 0) && (
                <tr>
                  <td colSpan={100} className="p-10">
                    {status === "pending" ? (
                      <TableLoader cols={5} count={20} />
                    ) : (
                      <IconNoData />
                    )}
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={100}>
                    <IconServerError />
                  </td>
                </tr>
              )}

              {result?.pages.map((page, pageKey) => (
                <React.Fragment key={pageKey}>
                {page.data.map((item, key) => {
              return (
              <tr key={key}>
                <td>{counter++}.</td>
                <td>
                <Pills isActive={item.adv_is_active} />
                </td>
                <td>{item.adv_title}</td>
                <td>
                  <ul className="table-action">
                    {item.adv_is_active ? (
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
                            onClick={()=>handleArchive(item)}
                          >
                            <Archive />
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button className="tooltip" data-tooltip="Restore">
                            <ArchiveRestore onClick={() => handleRestore(item)} />
                          </button>
                        </li>
                        <li>
                          <button
                            className="tooltip"
                            data-tooltip="Delete"
                            onClick={()=>handleDelete(item)}
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
          </React.Fragment>
         ))}
            </tbody>
          </table>

          <div className="pb-10 flex items-center justify-center text-white">
            <LoadMore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>
        </div>
      </div>

      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey="adv"
          mysqlApiDelete={`/v2/adv/${id}`}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey="adv"
          mysqlEndpoint={`/v2/adv/active/${id}`}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey="adv"
          mysqlEndpoint={`/v2/adv/active/${id}`}
        />
      )}
    </>
  );
};

export default AdvertisementTable;
