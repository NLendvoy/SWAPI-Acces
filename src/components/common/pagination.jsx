import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const {itemsCount, pageSize, currentPage, onPageChange} = props;       // Object destructuring

    const pagesCount = Math.ceil(itemsCount / pageSize);    // Determine the total number of pages
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);   // Use lodash to create an array for page use

    return (
        <nav>
            <ul className="pagination"> {/* Map the list of pagination buttons */}
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"}> {/* dynamically change the style of the buttons to match current page */}
                        <button className="page-link" onClick={() => onPageChange(page)}>     {/* Send onClick data to parent component */}
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
 
export default Pagination;