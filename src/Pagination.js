import React from 'react'

function Pagination( {
    totalPosts,
    postsPerPage,
    setCurretPage,
    currentPage,
}) {
        let pages = [];
        for (let i=1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
            pages.push(i);
        }
  return (
    <div>
        {
            pages.map((page,index)=>{
                return (
                    <button key={index} 
                    onClick={()=>setCurretPage(page)} 
                    className={page == currentPage ? "active" : ""}>
                        {page}
                        </button>
                );
               
            })}
    </div>
  );
};

export default Pagination
