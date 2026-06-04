import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cart")

  return savedCart ? JSON.parse(savedCart) : []
})
  useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  )
}, [cartItems])

  // Clear Cart
const clearCart = () => {
  setCartItems([])
}

// Add To Cart
const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(
      (item) => item.id === product.id
    )

    if (existingItem) {
      return prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    return [...prevItems, { ...product, quantity: 1 }]
  })
}

// Increase Quantity
const increaseQuantity = (id) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  )
}

// Decrease Quantity
const decreaseQuantity = (id) => {
  setCartItems((prevItems) =>
    prevItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  )
}

// Remove Product
const removeItem = (id) => {
  setCartItems((prevItems) =>
    prevItems.filter((item) => item.id !== id)
  )
}

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider