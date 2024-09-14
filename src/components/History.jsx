import { fetchHistory } from "@/utils/fetchHistory";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddFoodButton from "./AddFoodButton";

const History = () => {
  const session = useSession();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      if (session) {
        const historyData = await fetchHistory(session);
        setHistory(Array.isArray(historyData.foods) ? historyData.foods : []);
      }
    };
    loadHistory();
  }, [session]);
  return (
    <div className="flex flex-col justify-center items-center font-semibold ">
      <h1>History</h1>
      <div className="flex flex-col justify-center space-y-2 w-full p-4 ">
        {history &&
          history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center space-y-2 "
            >
              <div className="bg-gray-100 rounded-lg p-4 text-xs flex justify-between items-center dark:bg-[#323232] ">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.calories} cal</p>
                </div>
                <AddFoodButton
                  firstServing={item}
                  selectedFood={item}
                  session={session}
                  meal={item.mealType}
                  foodName={item.name}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
