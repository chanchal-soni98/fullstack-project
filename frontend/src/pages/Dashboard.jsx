import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useEffect } from "react";
import dummyData from '../data.json'; 
import { API_URL } from "../constant";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [ships, setShips] = useState([]);
  const [search, setSearch] = useState("");

  const fetchShips = async (query = "") => {
    try {
      const res = await fetch(`${API_URL}/getShip${query ? `?search=${query}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setShips(data);
    } catch (error) {
      console.error("Error fetching ships:", error);
      setShips(dummyData); 
    }
  };

  useEffect(() => {
    fetchShips();
  }, []);

   useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchShips(search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Maritime Operations Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6 m-6">
        <input
          type="text"
          placeholder="Search ships by name..."
          className="mb-6 p-2 border border-gray-300 rounded w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ships.map((ship, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={ship.image}
                alt={ship.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-blue-800 mb-2">
                  {ship.name}
                </h2>
                <p className="text-gray-700 font-medium mb-1">
                  <span className="text-gray-500">Type:</span> {ship.type}
                </p>
                <p className="text-gray-700 font-medium">
                  <span className="text-gray-500">Flag:</span> {ship.flag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
