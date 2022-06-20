import React from 'react';

const ReadTable = ({posts, handleEditPostForm}) => {
    return (
        <>
             {posts.map((post) => 
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.sprint}</td>
                        <td>{post.name}</td>
                        <td>{post.wentwell}</td>
                        <td>{post.wentwrong}</td>
                        <td>{post.focusarea}</td>
                        <td>{post.remarks}</td>
                        <td><button 
                type="button"
                className="me-3 btn btn-primary ml-auto d-block mb-2"
                data-bs-toggle="modal"
                data-bs-target="#editModalForm"
                onClick={(e) => handleEditPostForm(e, post)}
                >
                    Edit
                </button></td>
                    </tr>
                    )}
        </>
    )
}

export default ReadTable