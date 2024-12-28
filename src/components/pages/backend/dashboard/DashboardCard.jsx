import { getClothesByCategory } from "./function";

const DashboardCard = ({ item, dataClothes, title}) => {
  const clothesItem = getClothesByCategory(item.category_aid, dataClothes);
  const activeclothes = clothesItem?.filter((item)=>item.clothes_is_active == 1).reduce((prev,cur)=>prev+1 ,0);
  const inActiveclothes = clothesItem
    ?.filter((item) => item.clothes_is_active == 0)
    .reduce((prev, cur) => prev + 1, 0);
  return (
    <>
      <div className="card bg-secondary p-4 rounded-md border border-line">
        <small>{item.category_title}</small>
        <h2 className="text-4xl mt-1 mb-2">{clothesItem?.length} Items</h2>
        <ul className="flex gap-5 items-center">
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success block"></span>
            {activeclothes} active
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-gray-500 block"></span>{" "}
            {inActiveclothes} inactive
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardCard;
