import React, { useEffect, useState } from 'react';
import Card from './Card';
import Load from './Load';
import Nav from './Nav';
import './App.css';

const Main = () => {
  const [page, setPage] = useState(1); 
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = async (searchQuery ) => {
    setShow(true);
    const uri = searchQuery
      ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=80d7555970a64a799e5d7e2f7a023339&page=${page}&pageSize=9`
      : `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=80d7555970a64a799e5d7e2f7a023339&page=${page}&pageSize=9`;
    const res = await fetch(uri);
    const resp = await res.json();
    setData(resp.articles);
    setTotalResults(resp.totalResults);
    setShow(false);
  };

  useEffect(() => {
    fetchData(query);
  }, [page, category, query]); 

  const prev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const next = () => {
    setPage((prevPage) => (prevPage * 9 < totalResults ? prevPage + 1 : prevPage));
  };

  const searchNews = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchData(searchQuery);
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setQuery('');
    setPage(1);
    fetchData();
  };

  const srt = () => {
    setData((prevData) => 
      [...prevData].sort((a, b) => {
        const contentA = a.title || '';
        const contentB = b.title || '';
        return contentA.localeCompare(contentB);
      })
    );
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  return (
    <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Nav searchNews={searchNews} selectCategory={selectCategory} toggleDarkMode={toggleDarkMode} />
      <header className="text-center mb-4">
        <h1 className="display-4">Top Headlines</h1>
        <p className="lead">Stay updated with the latest news from around the world</p>
      </header>
      {show && <Load />}
      <div className="text-center mb-3">
        <button className='btn btn-secondary mx-2' onClick={srt}>Sort by Popularity</button>
      </div>
      <div className='row'>
        {data && data.length > 0 ? (
          data.map((ele, i) => (
            <div key={i} className='col-md-4 mb-3'>
              <Card 
                title={ele.title} 
                urlToImage={ele.urlToImage} 
                content={ele.content} 
                url={ele.url} 
                source={ele.source}
              />
            </div>
          ))
        ) : (
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col">
                <p>No articles found....</p>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-showing-rejected-news-11242566-9007764.png?f=webp" alt="No articles found" className="img-fluid" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='container d-flex justify-content-between mt-4'>
        <button className='btn btn-dark' onClick={prev} disabled={page === 1}>Previous</button>
        <button className='btn btn-dark' onClick={next} disabled={page * 9 >= totalResults}>Next</button>
      </div>
    </div>
  );
}

export default Main;
