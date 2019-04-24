import Pagination from "react-js-pagination";
import React, { Component } from 'react';
class OurPagination extends Component{
render(){
    const {activePage,handlePageChange}=this.props
    return(<>
    <Pagination
        activePage={activePage}
        itemsCountPerPage={1}
        totalItemsCount={5}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText='Prev'
        nextPageText='Next'
        firstPageText='←'
        lastPageText='→'
        activeClass='active'/>
        </>
    )
}
}

export default OurPagination;
