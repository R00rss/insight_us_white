import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  paginateBack,
  paginateFront,
  paginateLast,
  paginateFirst,
}) => {
  function PaginationBar() {
    if (pageNumbers.length > 0) {
      if (pageNumbers.length > 15) {
        let counter = 0;
        return (
          <>
            {pageNumbers.map((number, i) => {
              if (
                i === 0 ||
                i === pageNumbers.length - 1 ||
                currentPage === number
              ) {
                return (
                  <li
                    key={i}
                    onClick={() => paginate(number)}
                    className={`duration-300 ease-in-out cursor-pointer w-9 h-9  flex justify-center items-center rounded-full  border-[1px] border-transparent ${
                      currentPage === number
                        ? "border-blue-500 bg-blue-500/40"
                        : "bg-transparent hover:bg-blue-500 "
                    }`}
                  >
                    <span>{number}</span>
                  </li>
                );
              } else {
                if (i === currentPage - 2 || i === currentPage) {
                  return (
                    <li
                      key={i}
                      onClick={() => paginate(number)}
                      className={`duration-300 ease-in-out cursor-pointer w-9 h-9  flex justify-center items-center rounded-full  border-[1px] border-transparent ${
                        currentPage === number
                          ? "border-blue-500 bg-blue-500/40 "
                          : "bg-transparent hover:bg-blue-500 "
                      }`}
                    >
                      <span>{number}</span>
                    </li>
                  );
                } else {
                  if (counter < 3) {
                    counter++;
                    return (
                      <li
                        key={i}
                        className=" flex justify-center items-center bg-transparent "
                      >
                        <span>.</span>
                      </li>
                    );
                  }
                }
              }
            })}
          </>
        );
      } else {
        return (
          <>
            {pageNumbers.map((number, i) => (
              <li
                key={i}
                onClick={() => {
                  paginate(number);
                }}
                className={`duration-300 ease-in-out cursor-pointer w-9 h-9  flex justify-center items-center rounded-full  border-[1px] border-transparent ${
                  currentPage === number
                    ? "border-blue-500 bg-blue-500/40 "
                    : "bg-transparent hover:bg-blue-500 "
                }`}
              >
                <span>{number}</span>
              </li>
            ))}
          </>
        );
      }
    } else {
      return <>Sin resultados...</>;
    }
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <section className="flex flex-col justify-center items-center pt-2">
      <div className="py-1">
        <p className="text-sm text-gray-700">
          Mostrando de{" "}
          <span className="font-medium">
            {console.log(currentPage, "currentPage")}
            {console.log(postsPerPage, "postsPerPage")}
            {console.log(currentPage * postsPerPage - postsPerPage + 1)}
            {currentPage * postsPerPage - postsPerPage + 1}
          </span>{" "}
          a{" "}
          <span className="font-medium">
            {" "}
            {currentPage * postsPerPage > totalPosts
              ? totalPosts
              : currentPage * postsPerPage}{" "}
          </span>
          de <span className="font-medium"> {totalPosts} </span>
          resultados
        </p>
      </div>
      <nav>
        <ul className="flex flex-row gap-1 min-w-[300px] justify-around items-center">
          <li
            className="text-2xl flex justify-center items-center  cursor-pointer text-blue-500"
            onClick={() => paginateFirst()}
          >
            <span>&#171;</span>
          </li>
          <li
            className="text-2xl flex justify-center items-center cursor-pointer text-blue-500"
            onClick={() => paginateBack()}
          >
            <span>&#8249;</span>
          </li>
          <PaginationBar />
          <li
            className="text-2xl flex justify-center items-center cursor-pointer  text-blue-500"
            onClick={() => paginateFront()}
          >
            <span>&#8250;</span>
          </li>
          <li
            className="text-2xl flex justify-center items-center cursor-pointer  text-blue-500"
            onClick={() => paginateLast()}
          >
            <span>&#187;</span>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Pagination;
