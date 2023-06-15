import React, { useEffect, useState } from "react";
import { generalAlertConfirmResponse } from "../../utils/manageAlerts";
import Pagination from "./Pagination";
// import Posts from "../components/paginacion/Posts";
import PostsTable from "../table/PostsTable";
import { objIsEmpty } from "../../functions/ManageObjs";

const PaginacionTableIndicadores = ({ posts, maxNumberPost = 20 }) => {
  function calculateCurrentsPosts(
    data,
    indexOfFirstPost = 0,
    indexOfLastPost,
    keys = ["dataByCompanies", "dataByDates", "dataGlobal"]
  ) {
    const dataClone = JSON.parse(JSON.stringify(data));
    const temp2 = {};
    keys.forEach((item, i) => {
      const obj1 = {};
      Object.keys(dataClone[item]).forEach((item2, j) => {
        console.log(item2);
        console.log(j);
        if (
          indexOfFirstPost <= item2.length &&
          item2.length < indexOfLastPost
        ) {
          obj1[item2] = dataClone[item][item2];
        }
      });
      // temp2[item] = { ...obj1 };
      temp2[item] = obj1;
    });
    return temp2;
  }
  if (
    posts &&
    posts.dataByCompanies &&
    posts.dataByDates &&
    posts.dataGlobal &&
    !objIsEmpty(posts.dataByCompanies) &&
    !objIsEmpty(posts.dataByDates) &&
    !objIsEmpty(posts.dataGlobal)
  ) {
    console.log(posts);
    console.log("111", posts);
    const [showPosts, setShowPosts] = useState(false);
    const MAX_NUMBER_OF_POSTS = maxNumberPost;
    const [resultados, setResultados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts = calculateCurrentsPosts(
      posts,
      indexOfFirstPost,
      indexOfLastPost
    );

    useEffect(() => {
      setResultados(posts);
    }, []);
    useEffect(() => {
      setShowPosts(false);
      verifyNumberOfPages(resultados.length, setShowPosts);
    }, [resultados]);

    function verifyNumberOfPages(numberOfPosts, setter) {
      if (numberOfPosts > MAX_NUMBER_OF_POSTS) {
        const content = {
          title: "Alerta",
          message: `Se han encontrado ${resultados.length} resultados, ¿Seguro que quiere continuar? la aplicación puede tardar en renderizar`,
          typeOfAlert: "warning",
          buttonCancel: "Cancelar",
        };
        generalAlertConfirmResponse(content, setter);
      } else {
        setter(true);
      }
    }

    function paginateFront() {
      const numberOfPosts = resultados.length;
      if (numberOfPosts > postsPerPage) {
        if (indexOfLastPost <= resultados.length - 1) {
          setCurrentPage(currentPage + 1);
        } else {
          setCurrentPage(1);
        }
      }
    }
    function paginateBack() {
      const numberOfPosts = resultados.length;
      if (numberOfPosts > postsPerPage) {
        if (indexOfFirstPost > 0) {
          setCurrentPage(currentPage - 1);
        } else {
          setCurrentPage(Math.ceil(resultados.length / postsPerPage));
        }
      }
    }
    function paginateLast() {
      const numberOfPosts = resultados.length;
      if (numberOfPosts > postsPerPage) {
        setCurrentPage(Math.ceil(resultados.length / postsPerPage));
      }
    }
    function paginateFirst() {
      const numberOfPosts = resultados.length;
      if (numberOfPosts > postsPerPage) {
        setCurrentPage(1);
      }
    }
    return (
      <div>
        {resultados && resultados.length > 0 && showPosts && (
          <section className="pb-5">
            {/* <TitleComponent /> */}
            {/* <Posts items={currentPosts} handleSelect={handleSelect} /> */}
            <PostsTable items={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={resultados.length}
              paginate={(page) => setCurrentPage(page)}
              paginateFront={() => paginateFront()}
              paginateBack={() => paginateBack()}
              paginateLast={() => paginateLast()}
              paginateFirst={() => paginateFirst()}
              currentPage={currentPage}
            />
          </section>
        )}
      </div>
    );
  } else {
    return <div>test</div>;
  }
};

export default PaginacionTableIndicadores;
