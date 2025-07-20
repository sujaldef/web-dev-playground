const BASE_URL = "http://localhost:5000/api/form";

export const submitForm = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
