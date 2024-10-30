import { fetchHistory } from "@/utils/fetchHistory";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddFoodButton from "./AddFoodButton";

const History = ({ mealType, setMeal, date }) => {
  const session = useSession();
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    if (session) {
      const historyData = await fetchHistory(session);
      setHistory(Array.isArray(historyData.foods) ? historyData.foods : []);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center font-semibold h-screen">
      <h1 className="text-lg font-semibold">History</h1>
      <div className="flex flex-col justify-center space-y-2 w-full mt-4 ">
        {history &&
          history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center space-y-2 "
            >
              <div className="bg-secondary rounded-lg p-4 text-xs flex justify-between items-center  ">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.calories} cal</p>
                </div>
                <AddFoodButton
                  firstServing={item}
                  selectedFood={item}
                  session={session}
                  date={date}
                  meal={mealType}
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
