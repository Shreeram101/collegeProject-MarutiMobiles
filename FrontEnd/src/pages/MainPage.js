import React from 'react'
import Main from '../features/Product/Components/Main'
import Navbar from '../features/Navbar/Navbar'

const MainPage = () => {
    return (
        <>
            <Navbar />
            {/* <div className="">
                <div className="container-fluid">
                    <p className='fs-3 fw-bold py-3 px-3 shadow text-success' style={{ backgroundColor: '#ffffffff' }}>MOBILES</p>
                </div>
            </div> */}
            <Main></Main>
        </>
    )
}

export default MainPage