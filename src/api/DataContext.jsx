import React, { createContext, useEffect, useState } from "react";
import {
  getUniversities,
  getSliders,
  getCategories,
  getUniversityMap,
} from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [universities, setUniversities] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    getUniversities().then(setUniversities);
    getSliders().then(setSliders);
    getCategories().then(setCategories);
    getUniversityMap().then(setMapData);
  }, []);

  return (
    <DataContext.Provider
      value={{ universities, sliders, categories, mapData }}
    >
      {children}
    </DataContext.Provider>
  );
};
