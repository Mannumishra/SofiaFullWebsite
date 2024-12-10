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
import AllDownCatelogQuery from '../../Pages/DownCatelogQuery/AllDownCatelogQuery'
import AllCareerInquery from '../../Pages/CareerInquery/AllCareerInquery'
import AllBannerVedio from '../../Pages/BannerVedio/AllBannerVedio'
import AddBannerVedio from '../../Pages/BannerVedio/AddBannerVedio'
import EditBannerVedio from '../../Pages/BannerVedio/EditBannerVedio'
import AllGalleryImage from '../../Pages/GalleryImage/AllGalleryImage'
import AddGalleryImage from '../../Pages/GalleryImage/AddGalleryImage'
import AllEventImage from '../../Pages/EventImage/AllEventImage'
import AddEventImage from '../../Pages/EventImage/AddEventImage'
import EditEventImage from '../../Pages/EventImage/EditEventImage'
import EditGalleryImage from '../../Pages/GalleryImage/EditGalleryImage'
import Login from '../auth/Login'
import AllCertificateImage from '../../Pages/CertificateImage/AllCertificateImage'
import AddCertificateImage from '../../Pages/CertificateImage/AddCertificateImage'
import EditCertificateImage from '../../Pages/CertificateImage/EditCertificateImage'
import AllFAQ from '../../Pages/FAQ/AllFAQ'
import AddFAQ from '../../Pages/FAQ/AddFAQ'
import EditFAQ from '../../Pages/FAQ/EditFAQ'

const Home = () => {
  const login = sessionStorage.getItem("login")
  return (
    <>
      {
        login ? (
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
                <Route path={"/all-catelog-query"} element={<AllDownCatelogQuery />} />
                <Route path={"/all-career-query"} element={<AllCareerInquery />} />


                {/* --- Vouchers --- */}
                <Route path={"/all-testimonial"} element={<AllTestimonial />} />   {/* // All Vouchers */}
                <Route path={"/add-testimonial"} element={<AddTestimonial />} />
                <Route path={"/edit-testimonial/:id"} element={<EditTestimonial />} />



                <Route path={"/all-vedio"} element={<AllBannerVedio />} />   {/* // All Vouchers */}
                <Route path={"/add-vedio"} element={<AddBannerVedio />} />
                <Route path={"/edit-vedio/:id"} element={<EditBannerVedio />} />


                <Route path={"/all-gallery"} element={<AllGalleryImage />} />   {/* // All Vouchers */}
                <Route path={"/add-gallery"} element={<AddGalleryImage />} />
                <Route path={"/edit-gallery/:id"} element={<EditGalleryImage />} />

                <Route path={"/all-certificate"} element={<AllCertificateImage />} />   {/* // All Vouchers */}
                <Route path={"/add-certificate"} element={<AddCertificateImage />} />
                <Route path={"/edit-certificate/:id"} element={<EditCertificateImage />} />



                <Route path={"/all-event-image"} element={<AllEventImage />} />   {/* // All Vouchers */}
                <Route path={"/add-event-image"} element={<AddEventImage />} />
                <Route path={"/edit-event-image/:id"} element={<EditEventImage />} />

                {/* --- Tags --- */}
                <Route path={"/all-tags"} element={<AllTags />} />
                <Route path={"/add-tag"} element={<AddTag />} />
                <Route path={"/edit-tag/:id"} element={<EditTag />} />

                <Route path={"/all-faqs"} element={<AllFAQ />} />
                <Route path={"/add-faq"} element={<AddFAQ />} />
                <Route path={"/edit-faq/:id"} element={<EditFAQ />} />

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

              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/*" element={<Login />} />
          </Routes>
        )}
    </>
  )
}

export default Home