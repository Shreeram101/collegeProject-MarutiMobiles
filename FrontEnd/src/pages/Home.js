import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Productlist from '../features/Product/Components/Productlist'

const Home = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Navbar is already included in Productlist in your previous file, 
          but if you want it separate, keep it here. 
          Ideally, Productlist should not contain the Navbar if Home has it.
          Assuming Productlist has the content logic:
      */}
      <Productlist />
    </div>
  )
}

export default Home