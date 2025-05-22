import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function PaginatedItems(props) {
  const pageCount = Math.ceil(props.total / props.itemsPerPage);

  function topPage() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {
          topPage();
          props.setPage(e.selected + 1);
        }}
        pageRangeDisplayed={2} // After Selected How Many Pages Will Display
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null} //Beacuse If Page Count = 0 Display None
        containerClassName="custom-pagination"
        forcePage={props.page - 1}
      />
    </>
  );
}
