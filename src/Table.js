import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import ReadTable from './ReadTable';
import nextId from "react-id-generator";
import styled from 'styled-components';

const StyledDiv = styled.div`
    text-align: center;
    font-size: 30px;
`


const Table = () => {

const [searchQuery, setSearchQuery] = useState("")
const [posts, setPosts] = useState([])

const [addPost, setAddPost] = useState({
    id: '',
    sprint: '',
    name: '',
    wentwell: '',
    wentwrong: '',
    focusarea: '',
    remarks: ''
})

// Get ID
const [editPostId, setEditPostId] = useState(null)

const [editFormData, setEditFormData] = useState({
    id: addPost.id,
    sprint: addPost.sprint,
    name: addPost.name,
    wentwell: addPost.wentwell,
    wentwrong: addPost.wentwrong,
    focusarea: addPost.focusarea,
    remarks: addPost.remarks
})

// Get form values
const handleChange = (input) => (e) => {
    e.preventDefault()
    console.log(addPost)
    setAddPost({...addPost, [input]: e.target.value})
}

// Add data to table
const handleAddPost = (e) => {
    e.preventDefault()
    e.target.reset()
    const newPost = {
        id: nextId(),
        sprint: addPost.sprint,
        name: addPost.name,
        wentwell: addPost.wentwell,
        wentwrong: addPost.wentwrong,
        focusarea: addPost.focusarea,
        remarks: addPost.remarks
    }

    const newPosts = [...posts, newPost]
    setPosts(newPosts)
}


//edit form data
const handleEditPostForm = (e, post) => {
    e.preventDefault()
    setEditPostId(post.id)

    const formValues = {
        id: post.id,
        sprint: post.sprint,
        name: post.name,
        wentwell: post.wentwell,
        wentwrong: post.wentwrong,
        focusarea: post.focusarea,
        remarks: post.remarks
    }

    setEditFormData(formValues)
}

//Edit data value
const handleEditFormClick = (input) => (e) => {
    e.preventDefault()
    setEditFormData({...editFormData, [input]: e.target.value})
}

//Save form
const handleFormSave = (e) => {
    e.preventDefault()

    const savePost = {
        id: editFormData.id,
        sprint: editFormData.sprint,
        name: editFormData.name,
        wentwell: editFormData.wentwell,
        wentwrong: editFormData.wentwrong,
        focusarea: editFormData.focusarea,
        remarks: editFormData.remarks
    }

    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === editPostId)
    newPosts[formIndex] = savePost

    setPosts(newPosts)
    setEditPostId(null)
    console.log(editPostId);
}

//Delete data

const handleDelete = (e) => {
    e.preventDefault()

    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === editPostId)

    newPosts.splice(formIndex, 1)

    setPosts(newPosts)
}

//search filter data

function search() {
    return posts.filter(row => row.title.toLowerCase().indexOf(searchQuery) > -1)
}
    
//get data from json placeholder
// const fetchUrl = "https://jsonplaceholder.typicode.com/posts"
// useEffect(() => {
//     async function fetchData() {
//         const data = await axios.get(fetchUrl)
//         setPosts(data.data)
//     }
//     fetchData()
// },[fetchUrl])
// console.log(posts);

    return (
        <div>
            <StyledDiv>SCRUM RETRO</StyledDiv>
            <StyledDiv>RBB</StyledDiv>
            <div className="d-flex flex-row">
                <button 
                type="button"
                className="me-3 btn btn-primary ml-auto d-block mb-2"
                data-bs-toggle="modal"
                data-bs-target="#addModalForm">
                    Add Data+
                </button>
                <form className='row g-3 ms-auto'>
                    <div className='col-auto'>
                        <input
                         type="text"
                         className="form-control ms-auto"
                         placeholder="Search data"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         />
                    </div>
                </form>
            </div>
            <table className="table table-bordered border-primary table-responsible">
                <thead>
                    <tr>
                        <th scope="col">Row Id</th>
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
                   <ReadTable 
                //    posts={search(posts)}
                posts={posts}
                   handleEditPostForm={handleEditPostForm} />
                </tbody>
            </table>

            {/*Add Modal*/}
            <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
              <div className="mb-3">
                  <label className="form-label">Row Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    placeholder={addPost.id}
                    disabled
                    onChange={handleChange("id")}
                  />
                </div>
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
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        
        {/*Edit Row Modal */}
      <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Row</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSave}>
              <div className="mb-3">
                <label className="form-label">Row ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={editFormData.id}
                  onChange={handleEditFormClick("id")}
                  disabled
                />
              </div>
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
                >Save Row</button>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-danger float-start"
                  onClick={handleDelete}
                >Delete Row</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}

export default Table