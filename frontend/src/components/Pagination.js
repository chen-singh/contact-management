// function Pagination({ total, perPage, current, onChange }) {
//   const pages = Math.ceil(total / perPage);

//   return (
//     <div className="d-flex justify-content-center">
//       {[...Array(pages)].map((_, i) => (
//         <button
//           key={i}
//           className={`btn btn-sm mx-1 ${current === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => onChange(i + 1)}
//         >
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default Pagination;
function Pagination({ total, perPage, current, onChange }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div className="d-flex justify-content-center my-2">
      {[...Array(pages)].map((_, i) => (
        <button key={i} className={`btn btn-sm mx-1 ${current === i+1 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onChange(i+1)}>
          {i+1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
