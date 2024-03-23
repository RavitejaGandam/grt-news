import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";

function News() {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("india");
  let [currentPage, setCurretPage] = useState(1);
  let [postsPerPage, setPostsPerPage] = useState(6);
  useEffect(() => {
    category.length > 0
      ? fetch(
          `https://newsapi.org/v2/everything?q=${category}&from=2024-03-22&sortBy=publishedAt&apiKey=e178607b656a436aa0371c58d63e47a8`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Convert response to JSON format
          })
          .then((news) => {
            setArticles(news.articles);
            console.log(news.articles); // Handle JSON data
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          })
      : setCategory("india");
  }, [category]);
  let handlChange = (e) => {
    setCategory(e.target.value);
  };
  let lastPostIndex = currentPage * postsPerPage;
  let firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = articles.slice(firstPostIndex, lastPostIndex);
  // articles = currentPosts;
  return (
    <div className="news">
      <input
        type="text"
        placeholder="search for you want to know"
        className="search"
        onChange={handlChange}
      />
      {currentPosts.length > 0 ? (
        currentPosts.map((article, index) => (
          <div className="card" key={index} style={{ width: "18rem" }}>
            <div className="img">
              <img src={article.urlToImage} alt="Card image cap" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">
                {article.description?.substring(0, 100).concat("...")}
              </p>
              <a
                href={article.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        ))
      ) : (
        <h3>No News Found for the search !!</h3>
      )}
      <Pagination
        totalPosts={articles.length}
        postsPerPage={postsPerPage}
        setCurretPage={setCurretPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default News;

// function News() {
//     let [articles, setArticles] = useState([]);
//     let [category, setCategory] = useState("india");
//     let [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date

//     useEffect(() => {
//         fetch(`https://newsapi.org/v2/everything?q=${category}&from=${formatDate(selectedDate)}&sortBy=publishedAt&apiKey=e178607b656a436aa0371c58d63e47a8`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json(); // Convert response to JSON format
//             })
//             .then(news => {
//                 setArticles(news.articles);
//                 console.log(news.articles); // Handle JSON data
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//     }, [category, selectedDate]);

//     let handleChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const formatDate = (date) => {
//         return `${date.getFullYear()}-${(date.getMonth() - 2).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
//     };

//     return (
//         <div className="news">
//             <div className="search-container">
//             <DatePicker
//                 selected={selectedDate}
//                 onChange={date => setSelectedDate(date)}
//                 maxDate={new Date()}
//                 popperPlacement="bottom-end" // Set maximum selectable date to today
//             />
//             <input type='text' placeholder='search for what you want to know' className='search' onChange={handleChange} />
//             </div>
//             {articles.length > 0 ? (
//                 articles.map((article, index) => (
//                     <div className="card" key={index} style={{ width: "18rem" }}>
//                         <div className="img">
//                             <img src={article.urlToImage} alt="Card image cap" />
//                         </div>
//                         <div className="card-body">
//                             <h5 className="card-title">{article.title}</h5>
//                             <p className="card-text">
//                                 {article.description?.substring(0, 100).concat("...")}
//                             </p>
//                             <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
//                                 Read More
//                             </a>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <h3>No News Found for the search !!</h3>
//             )}
//         </div>
//     );
// }

// export default News;
