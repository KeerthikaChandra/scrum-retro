import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import ReadTable from "./ReadTable";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
  font-size: 30px;
`;

const Table = () => {
  const [searchPost, setSearchPost] = useState('');
  const [posts, setPosts] = useState([]);

  const [addPost, setAddPost] = useState({
    sprint: "",
    name: "",
    wentwell: "",
    wentwrong: "",
    focusarea: "",
    remarks: "",
  });

  // Get ID
  const [editPostId, setEditPostId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    sprint: "",
    name: "",
    wentwell: "",
    wentwrong: "",
    focusarea: "",
    remarks: "",
  });

  // Get form values
  const handleChange = (input) => (e) => {
    e.preventDefault();
    console.log(addPost);
    setAddPost({ ...addPost, [input]: e.target.value });
  };

  //edit form data
  const handleEditPostForm = (e, post) => {
    e.preventDefault();
    setEditPostId(post._id);

    const formValues = {
      sprint: post.sprint,
      name: post.name,
      wentwell: post.wentwell,
      wentwrong: post.wentwrong,
      focusarea: post.focusarea,
      remarks: post.remarks,
    };

    setEditFormData(formValues);
  };

  //Edit data value
  const handleEditFormClick = (input) => (e) => {
    e.preventDefault();
    setEditFormData({ ...editFormData, [input]: e.target.value });
  };

  //search filter data

  // function search() {
  //   return posts.filter(
  //     (row) => row.title.toLowerCase().indexOf(searchQuery) > -1
  //   );
  // }

  const fetchUrl = "https://scrum-tracker-api.herokuapp.com/getScrumdata";

  async function fetchData() {
    const data = await axios.get(fetchUrl);
    console.log("data", data);
    setPosts(data.data.data);
  }

  //delete function

  async function handleDelete(id) {
    await axios.delete("https://scrum-tracker-api.herokuapp.com/delete/" + id);
    await fetchData();
  }

  // Add data to table

  const handleAddPost = async (e) => {
    e.preventDefault();
    e.target.reset();
    const newPost = {
      sprint: addPost.sprint,
      name: addPost.name,
      wentwell: addPost.wentwell,
      wentwrong: addPost.wentwrong,
      focusarea: addPost.focusarea,
      remarks: addPost.remarks,
    };

    await axios.post(`https://scrum-tracker-api.herokuapp.com/postScrumdata`, newPost);

    await fetchData();
  };

  //Save form
  const handleFormSave = async (e) => {
    e.preventDefault();

    const savePost = {
      sprint: editFormData.sprint,
      name: editFormData.name,
      wentwell: editFormData.wentwell,
      wentwrong: editFormData.wentwrong,
      focusarea: editFormData.focusarea,
      remarks: editFormData.remarks,
    };

    await axios.put(`https://scrum-tracker-api.herokuapp.com/update/${editPostId}`, savePost);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleSearch = (input) => (e) => {
  //  setSearchPost({[input]: e.target.value})
  // };

  // const filteredPosts = async () => {
  //   if(posts){
  //     let searchedResult;
  //       searchedResult = posts.map((post) => {
  //       post.name.toLowerCase().includes(searchPost.toLowerCase()) ||
  //       post.wentwell.toLowerCase().includes(searchPost.toLowerCase()) ||
  //       post.wentwrong.toLowerCase().includes(searchPost.toLowerCase()) ||
  //       post.focuarea.toLowerCase().includes(searchPost.toLowerCase()) ||
  //       post.remarks.toLowerCase().includes(searchPost.toLowerCase())
  //    })
  //    console.log("searchedResult",searchedResult) 
  //   }
  //   else{
  //     console.log("error!")
  //   }
   
  // }

  // const filteredPosts = () => {
  //   const p = posts.filter(post => Object.values(post).some(val => val.toLowerCase().includes(searchPost.toLowerCase())));
  //   console.log("p",p);
  // }
    
  // filteredPosts();

  return (
    <div>
      <StyledDiv>SCRUM RETRO</StyledDiv>
      <StyledDiv>RBB</StyledDiv>
      <div className="d-flex flex-row">
        <button
          type="button"
          className="me-3 btn btn-primary ml-auto d-block mb-2"
          data-bs-toggle="modal"
          data-bs-target="#addModalForm"
        >
          Add Data +
        </button>
        {/* <form className="row g-3 ms-auto">
          <div className="col-auto">
            <input
              type="text"
              className="form-control ms-auto"
              name="search"
              placeholder="Search data"
              // value={}
              onChange={handleSearch("search")}
            />
          </div>
        </form> */}
      </div>
      <table className="table table-bordered border-primary table-responsible">
        <thead>
          <tr>
            {/* <th scope="col">Row Id</th> */}
            <th scope="col">Sprint</th>
            <th scope="col">Name</th>
            <th scope="col">What went well</th>
            <th scope="col">What went wrong</th>
            <th scope="col">Focus Area</th>
            <th scope="col">Additional Remarks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts && (
            <ReadTable
              //    posts={search(posts)}
              posts={posts}
              // posts={filteredPosts}
              handleEditPostForm={handleEditPostForm}
              handleDelete={handleDelete}
            />
          )}
        </tbody>
      </table>

      {/*Add Modal*/}
      <div
        className="modal fade"
        id="addModalForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">Sprint</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sprint"
                    placeholder="sprint"
                    required
                    onChange={handleChange("sprint")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    // required
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">What went well</label>
                  <textarea
                    rows="4"
                    cols="30"
                    className="form-control"
                    name="wentwell"
                    placeholder="What went well"
                    // required
                    onChange={handleChange("wentwell")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">What went wrong</label>
                  <textarea
                    rows="4"
                    cols="30"
                    className="form-control"
                    name="wentwrong"
                    placeholder="What went wrong"
                    // required
                    onChange={handleChange("wentwrong")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Focus Area</label>
                  <textarea
                    rows="4"
                    cols="20"
                    className="form-control"
                    name="focusarea"
                    placeholder="Focus area"
                    // required
                    onChange={handleChange("focusarea")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Additional Remarks</label>
                  <textarea
                    rows="4"
                    cols="20"
                    className="form-control"
                    name="remarks"
                    placeholder="Additional remarks"
                    // required
                    onChange={handleChange("remarks")}
                  ></textarea>
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-warning float-end"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*Edit Row Modal */}
      <div
        className="modal fade"
        id="editModalForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Row
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                  <label className="form-label">Sprint</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sprint"
                    value={editFormData.sprint}
                    onChange={handleEditFormClick("sprint")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormClick("name")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">What went well</label>
                  <textarea
                    rows="4"
                    cols="30"
                    className="form-control"
                    name="wentwell"
                    value={editFormData.wentwell}
                    onChange={handleEditFormClick("wentwell")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">What went wrong</label>
                  <textarea
                    rows="4"
                    cols="30"
                    className="form-control"
                    name="wentwrong"
                    value={editFormData.wentwrong}
                    onChange={handleEditFormClick("wentwrong")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Focus Area</label>
                  <textarea
                    rows="4"
                    cols="20"
                    className="form-control"
                    name="focusarea"
                    value={editFormData.focusarea}
                    onChange={handleEditFormClick("focusarea")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Additional remarks</label>
                  <textarea
                    rows="4"
                    cols="20"
                    className="form-control"
                    name="remarks"
                    value={editFormData.remarks}
                    onChange={handleEditFormClick("remarks")}
                  ></textarea>
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >
                    Save Row
                  </button>

                  {/* <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-danger float-start"
                  onClick={handleDelete}
                >Delete Row</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
