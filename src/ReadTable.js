import React from "react";

const ReadTable = ({ posts, handleEditPostForm, handleDelete }) => {
  return (
    <>
      {posts.map((post) => (
        <tr key={post._id}>
          <td>{post.sprint}</td>
          <td>{post.name}</td>
          <td>{post.wentwell}</td>
          <td>{post.wentwrong}</td>
          <td>{post.focusarea}</td>
          <td>{post.remarks}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary ms-1 btn-md"
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, post)}
            >
              {" "}
              Edit{" "}
            </button>
            <button
              type="submit"
              className="btn btn-danger btn-md ms-3"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ReadTable;
