import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  // Shopping Cart · Order
  const [order, setOrder] = useState([])

  // Get products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  // User Info: Create user
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null)
  
  const newCategory = (category) => {
    let newValue = category;
    switch (category) {
      case "men's clothing":
        newValue = "clothes"
        break;
      case "women's clothing":
        newValue = "clothes"
        break;
      case "jewelery":
        newValue = "furnitures"
        break;
    }
    return newValue;
  }

	const [isRegistered, setIsRegistered] = useState(false);
	const [message, setMessage] = useState('');
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const newItems = data.map(product => ({...product, category:newCategory(product.category)}));
        setItems(newItems)
      })
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  useEffect(() => {
    const localStorageItem = localStorage.getItem('accounts')
    const localStorageItemSelected = localStorage.getItem('account_selected')

    if (localStorageItem) {
      setUsers(JSON.parse(localStorageItem));
      setUserSelected(JSON.parse(localStorageItemSelected))
    } else {
      localStorage.setItem('accounts', JSON.stringify([]));
      localStorage.setItem('account_selected', null);
    }
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('accounts', JSON.stringify(users));
      localStorage.setItem('account_selected', JSON.stringify(userSelected));
    }
  }, [users, userSelected]);


  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory,
      users,
      setUsers,
      isRegistered,
      setIsRegistered, 
      message,
      setMessage,
      isValidUser,
      setIsValidUser,
      userSelected,
      setUserSelected
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

