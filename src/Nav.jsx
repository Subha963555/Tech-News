import React, { useState } from 'react';

const Nav = ({ searchNews, selectCategory, toggleDarkMode }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        searchNews(query);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-dark text-light">
                <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{ color: 'red', 'fontWeight':'bolder', borderRadius: '20%', padding: '5px' }}>
                        Tech-News....
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={() => selectCategory('')}>Home</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={() => selectCategory('sports')}>Sports</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={() => selectCategory('entertainment')}>Entertainment</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={() => selectCategory('science')}>Science</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={() => selectCategory('politics')}>Politics</button>
                            </li>
                        </ul>
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch" 
                                id="flexSwitchCheckDefault" 
                                onChange={toggleDarkMode} 
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark</label>
                        </div>
                        <form className="d-flex mx-4 my-1" role="search" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
