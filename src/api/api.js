const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const headers = API_KEY ? { "X-API-Key": API_KEY } : {};

const fetchWithHeaders = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, { headers });

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Invalid JSON or error response:\n${text}`);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error(`❌ Failed to fetch ${endpoint}:`, err.message);
    return { data: [] };
  }
};

// ✅ Get all universities
export const getUniversities = async () => {
  const data = await fetchWithHeaders("get_university.php");
  return data?.data || [];
};

// ✅ Get all categories (programs)
export const getCategories = async () => {
  const data = await fetchWithHeaders("get_category.php");
  return data?.data || [];
};

// ✅ Get only Under Graduate programs
export const getUGPrograms = async () => {
  const data = await getCategories();
  return data.filter((cat) =>
    cat.catg_type?.toLowerCase().includes("under graduate") || cat.catg_type?.toLowerCase() === "ug"
  );
};

// ✅ Get only Post Graduate programs
export const getPGPrograms = async () => {
  const data = await getCategories();
  return data.filter((cat) =>
    cat.catg_type?.toLowerCase().includes("post graduate")
  );
};

// ✅ Get only MBA-related programs
export const getMBAPrograms = async () => {
  const data = await getCategories();
  return data.filter((cat) =>
    cat.catg_name?.toLowerCase().includes("mba")
  );
};

// ✅ Example: get university-category mapping (optional)
export const getUniversityMap = async () => {
  const data = await fetchWithHeaders("get_university_map.php");
  return data?.data || [];
};

// ✅ Example: slider API (if used on homepage)
export const getSliders = async () => {
  const data = await fetchWithHeaders("get_sliders.php");
  return data?.data || [];
};
