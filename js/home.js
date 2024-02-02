const homeProductsElement = document.querySelector("#home-products")
const categoriesElement = document.querySelector("#categories-dropdown")


async function getCategories() {
    try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        console.log("CAT", response)
        const category = response?.data || [];
        if (categoriesElement.innerHTML.length === 0) {
            category.map(cat => {
                categoriesElement.innerHTML += `<li><a class="dropdown-item" onclick="getHomeProducts('${cat}')" href="#${cat}">${cat}</a></li>`
            })
        }
    } catch (e) {
        console.log("ERROR", e)
    }
}

getCategories()

async function getHomeProducts(category = "furniture") {
    try {
        const response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=4`);
        let products = response?.data?.products || []; // Code Guard 01

        console.log("response", response.data.products);

        if (products.length === 0 && response.status === 404) { // If API does not have products  // Code Guard 02
            new Error("No Data from server");
        }

        if (products.length > 0) {
            if(homeProductsElement?.children?.length === 4) {
                homeProductsElement.innerHTML = ""
            }
            if (homeProductsElement.children.length === 0) {
                products.forEach((product) => {
                    const {description, title, thumbnail, price, stock, rating, brand, images, id} = product;

                    const imagesToHTML = images.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                      <img src="${img}" height="300" class="d-block w-100" alt="...">
                    </div>`)

                    homeProductsElement.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                <div class="card" style="width: 18rem;">
                 <div id="product-images-${id}" class="carousel slide" data-bs-touch="false">
                  <div class="carousel-inner">
                    ${imagesToHTML}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#product-images-${id}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#product-images-${id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}.</p>
                        <p class="card-text">${rating}</p>
                        <strong class="card-text d-block my-2">${brand}</strong>
                        <a href="#" class="btn btn-primary">Add to Cart (${price}$)</a>
                    </div>
                </div>
            </div>
                `
                })
            }
        } else {
            console.log("No Data")

        }

    } catch (e) {
        console.log("ERROR", e)
    }
}

getHomeProducts()


/*
*
*
*  <li><a class="dropdown-item" href="#">Action</a></li>
*
* */
