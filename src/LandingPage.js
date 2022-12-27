import React from 'react'
import LandingNav from './partials/Header/LandingNav'
import SimpleImageSlider from "react-simple-image-slider";
import Footer from './partials/Footer/Footer';


const images = [
    { url: 'https://firebasestorage.googleapis.com/v0/b/preboardresult.appspot.com/o/1.png?alt=media&token=10e3fcf7-3e2f-4290-829d-119d5d825fa2' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/preboardresult.appspot.com/o/2.png?alt=media&token=7d29d1c8-c4b1-4044-8a52-69b707145211' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/preboardresult.appspot.com/o/3.png?alt=media&token=0285115d-4bb2-49cd-aefd-adbb9e10ed25' },

];

const LandingPage = () => {

    return (
        <div className='landing-page-main'>
            <LandingNav />
            <div className="slider-container">
                <SimpleImageSlider
                    width={1000}
                    height={450}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                />
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage