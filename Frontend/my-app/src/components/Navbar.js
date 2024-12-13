import React from "react";
//import Logo from "../../assets/website/coffee_logo.png";


const Menu = [
  { id: 1, name: "How it works", link: "#how-works" },
  { id: 2, name: "About us", link: "#about" },
  { id: 3, name: "Contact us", link: "#contact" },
];


const Navbar = () => {
  return (
    <>
      <div class="bg-myWhite text-myBrown shadow-md p-2">
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <div data-aos="fade-down" data-aos-once="true">
              {/* <a
                href="#"
                className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
              >
                <img src={Logo} alt="Logo" className="w-14" />
                Coffee Cafe
              </a> */}
            </div>

            {/* Link section */}
            <div
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay="300"
              className="flex justify-between items-center gap-4"
            >
              <ul className="hidden sm:flex items-center gap-4 ">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block text-xl py-4 px-4   duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
              </ul>
             
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;