import React, { useState } from "react";
import axios from "axios";

const UniversitySearch = () => {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setCountry("");
    setUniversities([]);
  };

  return (
    <div>
      <h1>Пошук університетів</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите название страны"
          value={country}
          onChange={handleInputChange}
        />
        <button type="submit">Відправити</button>
        <button type="button" onClick={handleReset}>
        Скидання
        </button>
      </form>
      {universities.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Назва</th>
              <th>Країна</th>
              <th>Веб-сайт</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university, index) => (
              <tr key={university.name}>
                <td>{index + 1}</td>
                <td>{university.name}</td>
                <td>{university.country}</td>
                <td>
                  {university.web_pages.map((webPage, idx) => (
                    <a
                      key={idx}
                      href={webPage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {webPage}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UniversitySearch;
