import { getAllShips } from "../Models/ShipModel.js";


const getShips = (req, res) => {
  const search = req.query.search || "";
  const filteredShips = getAllShips(search);
  res.status(200).json(filteredShips);
};

export { getShips };