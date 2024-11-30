import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import AllBanner from '../../Pages/Banners/AllBanner'
import AddBanner from '../../Pages/Banners/AddBanner'
import EditBanner from '../../Pages/Banners/EditBanner'
import AllTags from '../../Pages/Tags/AllTags'
import AddTag from '../../Pages/Tags/AddTag'
import EditTag from '../../Pages/Tags/EditTag'
import AllOrder from '../../Pages/Orders/AllOrder'
import EditOrder from '../../Pages/Orders/EditOrder'
import AllInplants from '../../Pages/Inplants/AllInplants'
import AddInplants from '../../Pages/Inplants/AddInplants'
import EditInplants from '../../Pages/Inplants/EditInplants'
import AllInstupment from '../../Pages/Instupments/AllInstupment'
import EditInstupment from '../../Pages/Instupments/EditInstupment'
import AddInstupment from '../../Pages/Instupments/AddInstupment'
import AllCatalog from '../../Pages/Catalog/AllCatalog'
import AddCatalog from '../../Pages/Catalog/AddCatalog'
import EditCatalog from '../../Pages/Catalog/EditCatalog'
import EditProduct from '../../Pages/Products/EditProduct'
import AllInstupmentProduct from '../../Pages/IsntupmentProduct/AllInstupmentProduct'
import AddInstupmentProduct from '../../Pages/IsntupmentProduct/AddInstupmentProduct'
import EditInstupmentProduct from '../../Pages/IsntupmentProduct/EditInstupmentProduct'
import AllDealerShip from '../../Pages/DealerShip/AllDealerShip'
import AllGetInTouch from '../../Pages/GetInTouch/AllGetInTouch'
import AllContactQuery from '../../Pages/ContactQuery/AllContactQuery'
import AllTestimonial from '../../Pages/Testimonial/AllTestimonial'
import AddTestimonial from '../../Pages/Testimonial/AddTestimonial'
import EditTestimonial from '../../Pages/Testimonial/EditTestimonial'

const Home = () => {
  return (
    <>

      <Header />
      <div className="rightside">
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard />} />

          {/* Category --  */}
          <Route path={"/all-category"} element={<AllCategory />} />
          <Route path={"/add-category"} element={<AddCategory />} />
          <Route path={"/edit-category/:id"} element={<EditCategory />} />


          {/* Category --  */}
          <Route path={"/all-inplants"} element={<AllInplants />} />
          <Route path={"/add-inplants"} element={<AddInplants />} />
          <Route path={"/edit-inplants/:id"} element={<EditInplants />} />


          {/* Category --  */}
          <Route path={"/all-instupment"} element={<AllInstupment />} />
          <Route path={"/add-instupment"} element={<AddInstupment />} />
          <Route path={"/edit-instupment/:id"} element={<EditInstupment />} />

          {/* Product --  */}
          <Route path={"/all-inplants-products"} element={<AllProduct />} />
          <Route path={"/add-inplants-product"} element={<AddProduct />} />
          <Route path={"/edit-inplants-product/:id"} element={<EditProduct />} />

          {/* Product --  */}
          <Route path={"/all-instupment-products"} element={<AllInstupmentProduct />} />
          <Route path={"/add-instupment-product"} element={<AddInstupmentProduct />} />
          <Route path={"/edit-instupment-product/:id"} element={<EditInstupmentProduct />} />


          {/* --- Orders --- */}
          <Route path={"/all-dealership-query"} element={<AllDealerShip />} />
          <Route path={"/all-getintouch-query"} element={<AllGetInTouch />} />
          <Route path={"/all-contact-query"} element={<AllContactQuery />} />

          {/* --- Vouchers --- */}
          <Route path={"/all-testimonial"} element={<AllTestimonial />} />   {/* // All Vouchers */}
          <Route path={"/add-testimonial"} element={<AddTestimonial />} />
          <Route path={"/edit-testimonial/:id"} element={<EditTestimonial />} />

          {/* --- Tags --- */}
          <Route path={"/all-tags"} element={<AllTags />} />
          <Route path={"/add-tag"} element={<AddTag />} />
          <Route path={"/edit-tag/:id"} element={<EditTag />} />

          {/* --- Banners --- */}
          <Route path={"/all-banners"} element={<AllBanner />} />
          <Route path={"/add-banner"} element={<AddBanner />} />
          <Route path={"/edit-banner/:id"} element={<EditBanner />} />

          {/* --- Catalog --- */}
          <Route path={"/all-catalog"} element={<AllCatalog />} />
          <Route path={"/add-catalog"} element={<AddCatalog />} />
          <Route path={"/edit-catalog/:id"} element={<EditCatalog />} />

          {/* --- Orders --- */}
          <Route path={"/all-orders"} element={<AllOrder />} />
          <Route path={"/edit-order/:id"} element={<EditOrder />} />





          {/* all-shop */}

        </Routes>
      </div>

    </>
  )
}

export default Home