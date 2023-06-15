import React, { useState } from "react";
import Pagination from "./Pagination";
import PostsPlantillaFiltrada from "./PostsPlantillaFiltrada";

const PaginationComponent = ({
  itemsToPaginate,
  handleSelectItem,
  postsPerPageProp = 10,
  initCurrentPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(initCurrentPage);
  const postsPerPage = postsPerPageProp;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = itemsToPaginate.slice(indexOfFirstPost, indexOfLastPost);

  function paginateFront() {
    const numberOfPosts = itemsToPaginate.length;
    if (numberOfPosts > postsPerPage) {
      if (indexOfLastPost <= itemsToPaginate.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(1);
      }
    }
  }
  function paginateBack() {
    const numberOfPosts = itemsToPaginate.length;
    if (numberOfPosts > postsPerPage) {
      if (indexOfFirstPost > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        setCurrentPage(Math.ceil(itemsToPaginate.length / postsPerPage));
      }
    }
  }
  function paginateLast() {
    const numberOfPosts = itemsToPaginate.length;
    if (numberOfPosts > postsPerPage) {
      setCurrentPage(Math.ceil(itemsToPaginate.length / postsPerPage));
    }
  }
  function paginateFirst() {
    const numberOfPosts = itemsToPaginate.length;
    if (numberOfPosts > postsPerPage) {
      setCurrentPage(1);
    }
  }

  return (
    <section>
      <PostsPlantillaFiltrada
        plantillasFiltradas={currentPosts}
        handleModal={handleSelectItem}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={itemsToPaginate.length}
        paginate={(page) => setCurrentPage(page)}
        paginateFront={() => paginateFront()}
        paginateBack={() => paginateBack()}
        paginateLast={() => paginateLast()}
        paginateFirst={() => paginateFirst()}
        currentPage={currentPage}
      />
    </section>
  );
};

export default PaginationComponent;
