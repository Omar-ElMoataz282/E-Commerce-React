import Skeleton from "react-loading-skeleton";

function SkeltonPage(props) {
  return Array.from({ length: props.countNum }).map((_, index) => (
    <div key={index} className={props.clStyle}>
      <Skeleton key={index} height={props.he} />
    </div>
  ));
}

export default SkeltonPage;
