import React, { useEffect, useState } from 'react'

const Crud = () => {

    const initialData = {
        name: "",
        email: ""
    }

    const [input, setInput] = useState(initialData)
    const [lists, setLists] = useState(() => {
        return JSON.parse(localStorage.getItem('users')) || [];
    })
    const [errors, setErrors] = useState({})
    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [button, setButton] = useState(false)

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(lists));
        console.log('Done');
    }, [lists])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const checkValidate = (input) => {
        const errors = {}

        if (input.name.trim() === "") {
            errors.name = "Invalid Name"
        }
        if (input.email == "") {
            errors.email = "Invalid Email"
        }
        return errors
    }

    const handleDelete = (id) => {
        const temp = [...lists]
        temp.splice(id, 1)
        setLists(temp)
    }

    const handleEdit = (id) => {
        setEdit(true)
        const editData = [...lists]
        editData.splice(id, 1)
        setInput(lists[id])
        setEditIndex(id)
        setButton(true)
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()

        const validate = checkValidate(input)
        setErrors(validate)
        const check = Object.keys(validate)
        if (check.length < 1) {
            setLists([...lists, input])
            setInput(initialData)
        }
        if(edit){
            lists[editIndex] = input
            setLists(lists)
            localStorage.setItem('users', JSON.stringify(lists))
            setEdit(false)
        }
        setButton(false)
    }

    return (
        <div className="container bg-dark border p-5">
            <div className="col-4 m-auto">
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name="name" value={input.name} id="" placeholder='Name' className='form-control my-3' onChange={handleChange} />
                    <div className='text-danger'>{errors.name}</div>
                    <input type="email" name="email" value={input.email} id="" placeholder='Email-ID' className='form-control my-3' onChange={handleChange} />
                    <div className='text-danger'>{errors.email}</div>
                    <button type='submit' className='btn btn-info'>{button ? "Update" : "Add"}</button>
                </form>
            </div>

            <table className='table text-center my-3' border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th colSpan={2} className='col-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lists.map((list, index) => {
                            return <tr key={index}>
                                <td>{list.name}</td>
                                <td>{list.email}</td>
                                <td><button className='btn btn-warning' onClick={() => handleEdit(index)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Crud