import product1 from "../assets/Back1.jpg"
import product2 from "../assets/Back2.jpg"
import product3 from "../assets/Back3.jpg"
import product4 from "../assets/Back4.jpg"

import BathroomMat from "../assets/rugs/BathroomMat.png"
import CircularCarpet from "../assets/rugs/CircularCarpet.png"
import DoorMat from "../assets/rugs/DoorMat.png"
import SemiCircularCarpet from "../assets/rugs/SemiCircularCarpet.png"
import tropicalcarpet from "../assets/rugs/tropicalcarpet.png"
import WelcomeDoorMat from "../assets/rugs/WelcomeDoorMat.png"

const products = [

//Place for product with id: 1
  {
    id: 2,
    name: "Designer Lighting",
    price: 3999,
    image: product2,
    category: "lighting",
    description: "Illuminate your space with our designer lighting collection, featuring elegant fixtures that blend style and functionality for a warm and inviting ambiance.",
    badge: "New"
  },

  {
    id: 3,
    name: "Modern Furniture",
    price: 12999,
    image: product3,
    category: "furniture",
    description: "Discover our modern furniture collection, where sleek design meets comfort, offering stylish and functional pieces to elevate your living space with contemporary elegance.",
    badge: "New",
  },

  {
    id: 4,
    name: "Premium Wallpaper",
    price: 5999,
    image: product4,
    category: "wall-decor",
    description: "Transform your walls with our premium wallpaper collection, featuring a variety of stylish patterns and textures that add depth and character to any room, creating a stunning focal point in your home.",
    badge: "Best Seller"
  },

  {
    id: 5,
    name: "Bathroom Mat",
    price: 699,
    image: BathroomMat,
    category: "rugs",
    description: "Step onto comfort with our bathroom mat collection, designed to provide a soft and absorbent surface that enhances safety and adds a touch of style to your bathroom decor.",
    badge: "Best Seller"
  },

  {id: 6,
    name: "Circular Carpet",
    price: 1179,
    image: CircularCarpet,
    category: "rugs",
    description: "Elevate your space with our circular carpet collection, featuring stylish and versatile designs that add a cozy and inviting touch to any room, creating a focal point of comfort and elegance.",
    badge: "Sale"
  },

  {
    id: 7,
    name: "Elite Door Mat",
    price: 1350,
    image: DoorMat,
    category: "rugs",
    description: "Make a statement with our elite door mat collection, designed to provide a durable and stylish entrance that enhances your home's curb appeal while keeping your floors clean.",
    badge: "Featured"
  },

  {
    id: 8,
    name: "Semi-Circular Carpet",
    price: 1179,
    image: SemiCircularCarpet,
    category: "rugs",
    description: "Add a touch of elegance to your space with our semi-circular carpet collection, featuring stylish designs that create a cozy and inviting atmosphere in any room."
  },

  {
    id: 9,
    name: "Tropical Carpet set of 2",
    price: 1179,
    image: tropicalcarpet,
    category: "rugs",
    description: "Bring the beauty of the tropics into your home with our tropical carpet set, featuring vibrant patterns and textures that add a lively and exotic touch to your living space."

  },

  {
    id: 10,
    name: "Welcome Door Mat",
    price: 379,
    image: WelcomeDoorMat,
    category: "rugs",
    description: "Welcome guests in style with our welcome door mat collection, designed to provide a warm and inviting entrance while keeping your floors clean and adding a touch of personality to your home's exterior."
  },
]

export default products