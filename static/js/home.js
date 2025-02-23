const baseURL = "https://ecommerce-backend-4yjb.onrender.com/product/";
const user_id = localStorage.getItem("user_id");

console.log(user_id);

const productLoad = (search) => {
  const url = search && search.trim() !== "" ? `${baseURL}?brand=${search}`: `${baseURL}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProduct(data));
};



const displayProduct = (products) => {
  console.log(products);
  const parent = document.getElementById("slider-container");
  parent.innerHTML = "";

  if (!products || products.length === 0) {
    parent.innerHTML =
      '<h2 class="text-center text-danger fw-bold mt-4">Product Not Found.</h2>';
    return;
  }

  products.forEach((product) => {
    const li = document.createElement("li");
    const imageUrl = product.image_url ? product.image_url : "";

    const descriptionText = (product.description || "").trim();
    const descriptionWords =
      descriptionText.split(/\s+/).slice(0, 5).join(" ") + "...";

    li.innerHTML = `
    <div class="card border-0 rounded-1 overflow-hidden bg-light">
    <div class="position-relative">
    <img src="${imageUrl}" class="card-img-top img-fluid w-100 " style="height: 250px; object-fit: cover;" loading="lazy" alt="${product.name}">
    <span class="badge bg-success position-absolute top-0 end-0 m-2 px-3 py-2">Stock: ${product.stock}</span>
    </div>
    </div>

  <div class="card-body d-flex flex-column p-4">
    <h5 class="card-title text-dark fw-bold">${product.name}</h5>
    <p class="card-text text-muted small flex-grow-1">${descriptionWords}</p>
    <h6 class="text-primary fw-bold">Price: $${product.price}</h6>
     <h6 class="text-black fw-bold">${product.brand_name}</h6>

    <div class="d-flex justify-content-between mt-3">

       <a href="cart_details.html?product_id=${product.id}" class="btn btn-outline-primary me-2"><i class="fas fa-info-circle"></i> Details</a>
      
    <button class="btn btn-primary btn-sm w-50 add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-stock="${product.stock}">
    <i class="fas fa-shopping-cart"></i> 
    Add To Cart
     </button>


  </div>
  </div>
</div>
    `;
    parent.appendChild(li);
  });


document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {

    if (!user_id) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "https://joyful-begonia-6e2001.netlify.app/login.html"; 
        }
      });
      return;
    }
    const targetButton = event.target.closest(".add-to-cart"); 
    if (!targetButton) return;

    const product = {
      id: targetButton.dataset.id,
      name: targetButton.dataset.name,
      price: parseFloat(targetButton.dataset.price),
      stock: parseInt(targetButton.dataset.stock),
      quantity: 1,
    };


    if (!product.id || !product.name) {
      alert("Invalid product data!");
      return;
    }

    addToCart(product);
  });
});


const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    if (existingProduct.quantity < product.stock) {
      existingProduct.quantity++;
    } else {
      alert("No more stock available!");
    }
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
};
}






const keybordURL = "https://ecommerce-backend-4yjb.onrender.com/keybord/";
const keybordLoad = (search = "") => {
  console.log("Search Query:", search);
  const url =
    search.trim() !== "" ? `${keybordURL}?brand=${search}` : keybordURL;
  console.log("Fetching from:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayKeybord(data))
    .catch((error) => console.error("Error fetching keyboards:", error));
};

const displayKeybord = (keybords) => {
  console.log(keybords);

  const parent = document.getElementById("slider-container-keybord");
  parent.innerHTML = "";

  if (!keybords || keybords.length === 0) {
    parent.innerHTML =
      '<h2 class="text-center text-danger fw-bold mt-4">Keyboard Not Found.</h2>';
    return;
  }

  keybords.forEach((keybord) => {
    const li = document.createElement("li");
    const imageUrl = keybord.image_url ? keybord.image_url : "";

    const descriptionText = (keybord.description || "").trim();
    const descriptionWords =
      descriptionText.split(/\s+/).slice(0, 5).join(" ") + "...";

    li.innerHTML = `
      <div class="card border-0 rounded-1 overflow-hidden bg-light">
        <div class="position-relative">
          <img src="${imageUrl}" class="card-img-top img-fluid w-100" style="height: 250px; object-fit: cover;" loading="lazy" alt="${keybord.name}">
          <span class="badge bg-success position-absolute top-0 end-0 m-2 px-3 py-2">Stock Out</span>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <h5 class="card-title text-dark fw-bold">${keybord.name}</h5>
          <p class="card-text text-muted small flex-grow-1">${descriptionWords}</p>
          <h6 class="text-primary fw-bold">Price: $${keybord.price}</h6>
          <h6 class="text-black fw-bold">${keybord.brand_name}</h6>

          <div class="d-flex justify-content-between mt-3">
          <a href="" class="btn btn-outline-primary me-2">
              <i class="fas fa-info-circle"></i> Details
            </a>
            <button class="btn btn-primary btn-sm w-50 add-to-cart"<i class="fas fa-shopping-cart"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    `;
    parent.appendChild(li);
  });

  setupEventListeners();
};





const addToCart = (id, name, price) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire({
    icon: "success",
    title: "Added to Cart",
    text: `${name} added successfully!`,
  });

  updateCartSummary(); 
};





const headphoneURL = "https://ecommerce-backend-4yjb.onrender.com/headphone/";

const HeadphoneLoad = (search = "") => {
  console.log("Search Query:", search);
  const url = search.trim() !== "" ? `${headphoneURL}?brand=${search}` : headphoneURL;
  console.log("Fetching from:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayHeadphone(data))
    .catch((error) => console.error("Error fetching headphones:", error));
};

const displayHeadphone = (headphones) => {
  console.log(headphones);
  const parent = document.getElementById("slider-container-headphone");
  parent.innerHTML = "";

  if (!headphones || headphones.length === 0) {
    parent.innerHTML = '<h2 class="text-center text-danger fw-bold mt-4">Headphone Not Found.</h2>';
    return;
  }

  headphones.forEach((headphone) => {
    const li = document.createElement("li");
    const imageUrl = headphone.image_url ? headphone.image_url : "";

    const descriptionText = (headphone.description || "").trim();
    const descriptionWords = descriptionText.split(/\s+/).slice(0, 5).join(" ") + "...";

    li.innerHTML = `
      <div class="card border-0 rounded-1 overflow-hidden bg-light">
        <div class="position-relative">
          <img src="${imageUrl}" class="card-img-top img-fluid w-100" style="height: 250px; object-fit: cover;" loading="lazy" alt="${headphone.name}">
          <span class="badge bg-success position-absolute top-0 end-0 m-2 px-3 py-2">Stock Out</span>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <h5 class="card-title text-dark fw-bold">${headphone.name}</h5>
          <p class="card-text text-muted small flex-grow-1">${descriptionWords}</p>
          <h6 class="text-primary fw-bold">Price: $${headphone.price}</h6>
          <h6 class="text-black fw-bold">${headphone.brand_name}</h6>
          
          <div class="d-flex justify-content-between mt-3">
            <a href="" class="btn btn-outline-primary me-2 details-btn">
              <i class="fas fa-info-circle"></i> Details
            </a>
            <button class="btn btn-primary btn-sm w-50 add-to-cart" 

              <i class="fas fa-shopping-cart"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    `;
    parent.appendChild(li);
  });





const addToCarts = (id, name, price, stock) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    if (existingItem.quantity < stock) {
      existingItem.quantity++;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        text: `Only ${stock} items available in stock!`,
      });
      return;
    }
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
    icon: "success",
    title: "Added to Cart",
    text: `${name} added successfully!`,
  });

};
}



const loadBrand = () => {
  fetch("https://ecommerce-backend-4yjb.onrender.com/Brand/")
    .then((res) => res.json())
    .then((data) => {

      const parent = document.getElementById("brand");
      parent.innerHTML = `<option value="">Brand</option>`;

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        parent.appendChild(option);
      });

      parent.addEventListener("change", (event) => {
        const selectedBrand = event.target.value;

        if (typeof productLoad === "function") {
          productLoad(selectedBrand || "");
        } else {
          console.warn("productLoad function is not defined.");
        }
      });
    })
    .catch((error) => console.error("Error loading brands:", error));
};

loadBrand();

productLoad();

keybordLoad();

HeadphoneLoad();






