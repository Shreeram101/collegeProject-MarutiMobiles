import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { categoryAsync, deleteCategoryAsync, selectCatagories } from '../../Product/ProductSlice'

const AdminCategoryList = () => {
  const Category = useSelector(selectCatagories);
  console.log(Category);
  
  const dispatch = useDispatch();
  const [del, setDel] = useState(0)

  useEffect(() => { 
    dispatch(categoryAsync());
  }, [dispatch, del]);

  const handleDelete = (id) => {
    if(window.confirm("Delete this category?")) { 
        dispatch(deleteCategoryAsync(id))
        setDel((d) => d + 1)
    }
  }

  return (
    <div className="fade-in-up">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-dark">Category Management</h2>
            <Link to='/insertcategory' className="btn btn-primary-custom shadow-sm">
                <i className="fa-solid fa-plus me-2"></i>Add Category
            </Link>
        </div>

        <div className="row">
            <div className="col-lg-8 mx-auto">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-0">
                        <table className='table table-hover align-middle mb-0'>
                            <thead className="bg-light text-secondary small text-uppercase">
                                <tr>
                                    <th className="ps-4 py-3">Category Name</th>
                                    <th className="py-3 text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Category.map((c) => (
                                    <tr key={c.id}>
                                        <td className="ps-4 py-3">
                                            <span className="fw-bold text-dark"><i className="fa-solid fa-tag me-2 text-primary"></i>{c.category}</span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                className='btn btn-light btn-sm rounded-circle shadow-sm hover-danger text-danger'
                                                title="Delete"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminCategoryList