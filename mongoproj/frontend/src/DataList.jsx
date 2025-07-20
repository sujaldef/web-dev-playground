import { useEffect, useState } from "react";
import { fetchData } from "./api";

const DataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      if (result?.success) {
        setData(result.data);
      }
    };
    getData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Stored Data</h2>
      {data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item._id} className="border p-2 rounded">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Message:</strong> {item.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default DataList;
