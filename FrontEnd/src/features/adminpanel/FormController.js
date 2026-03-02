import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { insertProductAsync } from '../Product/ProductSlice';

export default function FormController() {
    const [Image, setImage] = useState('');
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleUploadImage = (event) => {
        setImage(event.target.files[0])
    }

    const onsubmit = async () => {
        const formData = new FormData()
        formData.append("Image", Image)

        dispatch(insertProductAsync(formData))

    }

    return (
        <div className="App">
            <form
                onSubmit={handleSubmit(onsubmit)}
                enctype="multipart/form-data"
                className='py-5'
            >
                <div class="mb-3 ">
                    <label for="Image" className="col-sm-1 col-form-label fw-medium me-4" style={{ fontFamily: 'sans-serif' }}>UploadImage: </label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-md border-dark-subtle w-50" name='Image' type="file" id="Image" onChange={handleUploadImage} />
                    </div>
                </div>

                <button className='btn btn-primary' type="submit">Submit</button>
            </form>
        </div>
    )
}