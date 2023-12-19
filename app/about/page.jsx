import React from 'react'
import ArcCard from './components/ArcCard'
import Navbar from '../components/Navbar'
export default function Page() {
  const members = [
    {
      name: "Varad Prabhu",
      title: "Team Leader / Web & Backend Lead",
      url: "https://www.linkedin.com/in/varadprabhu/",
      college: "DJSCE COMPS",
      img: "/varad.jpg"
    },
    {
      name: "Tirath Bhathawala",
      title: "ML Lead",
      url: "https://www.linkedin.com/in/tirath-bhathawala-a58769159/",
      college: "DJSCE COMPS",
      img: "/tirath.jpeg"
    },
    {
      name: "Siddhant Uniyal",
      title: "ML Subordinate & Subordinate Orator",
      url: "https://www.linkedin.com/in/siddhant-uniyal-019767228/",
      college: "DJSCE COMPS",
      img: "/siddhant.jpg"
    },
    {
      name: "Rudra Shukla",
      title: "App Lead",
      url: "https://www.linkedin.com/in/rudra-shukla-69927b260/",
      college: "DJSCE COMPS",
      img: "/rudra.jpeg"
    },
    // {
    //   name: "Taran Shah",
    //   title: "Lead Orator & ML Subordinate",
    //   url: "https://www.linkedin.com/in/taran-shah-78b9a2226/",
    //   college: "DJSCE COMPS",
    //   img: "/taran.jpeg"
    // },
    // {
    //   name: "Shubham Jaiswar",
    //   title: "ML Subordinate",
    //   url: "https://www.linkedin.com/in/shubhamjaiswar/",
    //   college: "DJSCE COMPS",
    //   img: "/shubham.jpeg"
    // },
    // {
    //   name: "Milind Pithadia",
    //   title: "Design Lead & Web Subordinate",
    //   url: "https://www.linkedin.com/in/milind-pithadia-66a129295/",
    //   college: "DJSCE IT",
    //   img: "/milind.jpg"
    // },
    // {
    //   name: "Varun Tank",
    //   title: "Research Lead & Subordinate Orator",
    //   url: "mailto:varuntank2019@gmail.com",
    //   college: "DJSCE COMPS",
    //   img: "/varun.jpeg"
    // }
  ]
  return (
    <div className='w-full outline-white-900 overflow-y-scroll  min-h-screen '>
      <Navbar/>
      <div className="area z-10" >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    <h1 className=' py-12 text-6xl font-bold w-full flex justify-center items-center text-center'>
    <svg id='hiwHeading'  className=' w-[80vw] md:w-[60vw] lg:w-[30vw] fill-transparent border-slate-100' viewBox="0 0 742 118" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M633.888 3.93176H631.388V6.43176V111.159V113.659H633.888H645.751H648.251V111.159V41.7547L677.189 112.11L677.826 113.659H679.501H690.956H692.631L693.268 112.11L722.206 41.7547V111.159V113.659H724.706H736.57H739.07V111.159V6.43176V3.93176H736.57H721.433H719.755L719.12 5.48454L685.229 88.2641L651.338 5.48454L650.702 3.93176H649.024H633.888Z" stroke="#3e77b6" stroke-width="5"/>
<path d="M540.871 113.659H542.636L543.227 111.995L553.165 83.9999H591.986L601.924 111.995L602.514 113.659H604.28H617.575H621.156L619.922 110.297L581.467 5.57005L580.866 3.93176H579.121H566.03H564.284L563.683 5.57005L525.228 110.297L523.994 113.659H527.575H540.871ZM572.575 29.3206L586.217 67.75H558.933L572.575 29.3206Z" stroke="#3e77b6" stroke-width="5"/>
<path d="M448.013 111.159V113.659H450.513H514.535H517.035V111.159V99.909V97.409H514.535H465.695V66.8181H510.445H512.945V64.3181V53.0681V50.5681H510.445H465.695V20.1818H513.717H516.217V17.6818V6.43176V3.93176H513.717H450.513H448.013V6.43176V111.159Z" stroke="#3e77b6" stroke-width="5"/>
<path d="M349.895 17.6818V20.1818H352.395H382.826V111.159V113.659H385.326H398.008H400.508V111.159V20.1818H430.94H433.44V17.6818V6.43176V3.93176H430.94H352.395H349.895V6.43176V17.6818Z" stroke="#3e77b6" stroke-width="5"/>
<path d="M223.013 111.159V113.659H225.513H238.195H240.695V111.159V72.75H261.104C261.506 72.75 261.905 72.7468 262.301 72.7403L283.653 112.345L284.361 113.659H285.854H300.581H304.801L302.773 109.958L280.484 69.2714C281.085 69.0071 281.672 68.7272 282.245 68.4315L282.245 68.4316L282.256 68.4256C287.878 65.486 292.135 61.3892 294.916 56.1284C297.655 50.9471 298.99 45.0643 298.99 38.5454C298.99 32.0257 297.655 26.1149 294.923 20.873C292.145 15.5431 287.873 11.3919 282.216 8.41536C276.495 5.37065 269.342 3.93176 260.899 3.93176H225.513H223.013V6.43176V111.159ZM260.695 56.2954H240.695V20.1818H260.49C265.927 20.1818 270.048 21.0221 273.017 22.5213L273.025 22.5258L273.034 22.5302C276.039 24.0177 278.123 26.0667 279.424 28.6691C280.788 31.3967 281.513 34.665 281.513 38.5454C281.513 42.4288 280.787 45.631 279.44 48.2384L279.435 48.2481C278.184 50.6946 276.136 52.6501 273.121 54.0829L273.113 54.087C270.163 55.5027 266.075 56.2954 260.695 56.2954Z" stroke="#3e77b6" stroke-width="5"/>
<path d="M187.506 3.93176H185.006V6.43176V74.75C185.006 79.4845 183.968 83.6035 181.953 87.175L181.95 87.1813C179.978 90.7004 177.128 93.4908 173.328 95.5619C169.573 97.5754 164.989 98.6363 159.483 98.6363C153.979 98.6363 149.396 97.5761 145.641 95.564C141.876 93.4939 139.019 90.7007 137.01 87.1709C134.997 83.6003 133.96 79.4826 133.96 74.75V6.43176V3.93176H131.46H118.778H116.278V6.43176V75.7727C116.278 83.3374 118.049 90.1782 121.64 96.2255L121.645 96.2331L121.649 96.2408C125.272 102.242 130.356 106.963 136.834 110.401L136.843 110.406C143.367 113.832 150.939 115.5 159.483 115.5C168.026 115.5 175.599 113.832 182.122 110.407L182.132 110.401C188.612 106.962 193.682 102.238 197.271 96.2312C200.899 90.1835 202.687 83.3405 202.687 75.7727V6.43176V3.93176H200.187H187.506Z" stroke="#3e77b6" stroke-width="5"/>
<path d="M67.0815 23.7889L67.0879 23.7928C71.7779 26.7124 75.5535 31.0457 78.3776 36.9187L78.3825 36.9286C81.2081 42.7386 82.6818 49.9943 82.6818 58.7955C82.6818 67.5966 81.2081 74.8523 78.3824 80.6623L78.3776 80.6723C75.5535 86.5453 71.7779 90.8785 67.0879 93.7981L67.0816 93.802C62.3865 96.7443 57.1236 98.2273 51.2273 98.2273C45.3325 98.2273 40.0509 96.745 35.3191 93.8003C30.6614 90.8807 26.8829 86.5452 24.0232 80.6669C21.2297 74.855 19.7727 67.5974 19.7727 58.7955C19.7727 49.9933 21.2298 42.7355 24.0234 36.9236C26.8831 31.0455 30.6615 26.7101 35.3191 23.7906C40.0509 20.8459 45.3325 19.3636 51.2273 19.3636C57.1236 19.3636 62.3865 20.8466 67.0815 23.7889ZM93.7114 88.5423C97.906 80.0814 99.9545 70.1392 99.9545 58.7955C99.9545 47.4517 97.906 37.5096 93.7114 29.0487C89.5377 20.6299 83.7672 14.0594 76.3856 9.4278C68.998 4.79247 60.5862 2.5 51.2273 2.5C41.8683 2.5 33.4565 4.79247 26.069 9.4278C18.6874 14.0594 12.9168 20.6299 8.7431 29.0487C4.54851 37.5096 2.5 47.4517 2.5 58.7955C2.5 70.1392 4.54851 80.0814 8.7431 88.5423C12.9168 96.961 18.6874 103.532 26.069 108.163C33.4565 112.798 41.8683 115.091 51.2273 115.091C60.5862 115.091 68.998 112.798 76.3856 108.163C83.7672 103.532 89.5377 96.961 93.7114 88.5423Z" stroke="#3e77b6" stroke-width="5"/>
</svg>
    </h1>
      <div className=" w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 pb-12  px-12 flex-wrap gap-8 min-h-screen items-start justify-center">
        {members.map((member, index) => (
          <ArcCard key={index} name={member.name} title={member.title} url={member.url} college={member.college} img={member.img} />
        ))}
      </div>
    </div>
  )
}




