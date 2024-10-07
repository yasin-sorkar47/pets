// fetch the categories from api
const fetchTheCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  showTheCategoriesToUI(data.categories);
};

// fetch the pets Data
const fetchThePetsData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  showThePetsToUI(data.pets);
};

// show the categories to UI
const showTheCategoriesToUI = (categories) => {
  const btnContainer = document.getElementById("btn-container");

  categories.forEach((element) => {
    const { category, category_icon } = element;

    btnContainer.innerHTML += `<button
            onclick="handleCategories('${category}')"
            id=${category}
              class="flex items-center justify-center gap-3 border py-4 lg:py-7 rounded-xl category-btn"
            >
              <img src=${category_icon} alt="image" />
              <span class="text-2xl font-bold">${category}</span>
            </button>`;
  });
};

// show the pets to UI
const showThePetsToUI = (pets) => {
  const cardContainer = document.getElementById("card-container");
  let isData = true;

  if (isData) {
    cardContainer.innerHTML = `
    <div class="col-span-3 flex justify-center">
    <span class="loading loading-bars loading-lg"></span>
    </div>
    `;
  }

  if (pets.length === 0) {
    cardContainer.innerHTML = `
    <div class="col-span-3 flex justify-center bg-gray-100 rounded-md py-[50px] lg:py-[100px]" >
      <div>
                <img
                  class="mx-auto pb-4"
                  src="./assets/images/error.webp"
                  alt="image"
                />
                <h6 class="text-2xl font-bold text-center">
                  No Information Available
                </h6>
                <p class="text-base font-normal text-center max-w-[660px]">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a.
                </p>
              </div>
            </div>             
    `;
    return;
  }

  setTimeout(() => {
    if (isData) {
      cardContainer.innerHTML = "";
    }

    pets.forEach((item) => {
      const { breed, date_of_birth, gender, price, image, pet_name, petId } =
        item;

      cardContainer.innerHTML += `
         <div
                  class="p-5 border shadow-md rounded-md flex flex-col justify-center"
                >
                  <img src=${image ? image : "Not Found"} alt="image" />
                  <div class="mt-6 space-y-1">
                    <h5 class="text-xl font-bold">${
                      pet_name ? pet_name : "Not Found"
                    }</h5>
                    <div class="flex items-center gap-2">
                      <img src="./assets/images/breed.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">
                        Breed: ${breed ? breed : "Not Found"}
                      </p>
                    </div>
                    <div class="flex items-center gap-2">
                      <img src="./assets/images/birth.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">Birth: ${
                        date_of_birth ? date_of_birth : "Not Found"
                      }</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <img src="./assets/images/gender.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">
                        Gender: ${gender ? gender : "Not Found"}
                      </p>
                    </div>
                    <div class="flex items-center gap-2 pb-3">
                      <img src="./assets/images/price.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">Price: ${
                        price ? price + "$" : "Not Found"
                      }</p>
                    </div>
                    <hr />
                    <div class="flex justify-between items-center pt-4">
                      <button
                      onclick="handleLikeButton('${image}')"
                        class="px-4 py-2 border rounded-md text-btnColor font-bold"
                      >
                        <img src="./assets/images/like.png" alt="image" />
                      </button>
                      <button
                      id=${petId}
                      onclick="handleAdopt('${petId}')"
                        class="px-4 py-2 border rounded-md text-btnColor font-bold"
                      >
                        Adopt
                      </button>
                      <button
                        onclick="handleDetails('${petId}')"
                        class="px-4 py-2 border rounded-md text-btnColor font-bold"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
        `;
    });
  }, 2000);
};

// handle the categories btn
const handleCategories = async (category) => {
  const getBtn = document.getElementById(category);

  //   first remove classes
  removeClassesOfAllButton();

  //   than add classes
  getBtn.classList.add(
    "rounded-full",
    "border-btnColor",
    "bg-btnColor",
    "bg-opacity-15"
  );

  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();
  showThePetsToUI(data.data);
};

// first remove all button classes
const removeClassesOfAllButton = () => {
  const categoryBtn = document.getElementsByClassName("category-btn");
  for (const btn of categoryBtn) {
    btn.classList.remove(
      "rounded-full",
      "border-btnColor",
      "bg-btnColor",
      "bg-opacity-15"
    );
  }
};

// handleLikeButton
const handleLikeButton = (image) => {
  const rightSite = document.getElementById("rightSite");
  rightSite.innerHTML += `
  <img class="rounded-md" src=${image} alt="image" />
  `;
};

// handleDetails
const handleDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  showTheDataInModal(data.petData);

  my_modal_1.showModal();
};

// show the data in the modal UI
const showTheDataInModal = (modalData) => {
  const {
    date_of_birth,
    price,
    breed,
    image,
    gender,
    pet_details,
    pet_name,
    vaccinated_status,
  } = modalData;

  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
      <div
                  class="p-5  flex flex-col justify-center"
                >
                  <img src=${image ? image : "Not Found"} alt="image" />
                  <div class="mt-6 space-y-1">
                    <h5 class="text-xl font-bold">${
                      pet_name ? pet_name : "Not Found"
                    }</h5>
                   <div class="flex gap-3 m-0">
                    <div class="m-0">
                    <div class="flex items-center gap-5">
                      <img src="./assets/images/breed.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">
                        Breed: ${breed ? breed : "Not Found"}
                      </p>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <img src="./assets/images/gender.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">
                        Gender: ${gender ? gender : "Not Found"}
                      </p>
                    </div>
                    </div>
                   <div class="m-0">
                    <div class="flex items-center gap-2">
                      <img src="./assets/images/birth.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">Birth: ${
                        date_of_birth ? date_of_birth : "Not Found"
                      }</p>
                    </div>
                    <div class="flex items-center gap-2 ">
                      <img src="./assets/images/price.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">Price: ${
                        price ? price + "$" : "Not Found"
                      }</p>
                    </div>
                    </div>
                    </div>
                      <div class="flex items-center gap-2 pb-3">
                      <img src="./assets/images/gender.png" alt="icon" />
                      <p class="text-base font-normal text-gray-500">
                        Vaccinated status: ${
                          vaccinated_status ? vaccinated_status : "Not Found"
                        }
                      </p>
                    </div>
                    <hr />
                    <h4 class="text-xl font-bold">Details Information</h4>
                    <p>${pet_details ? pet_details : "Not Found"}</p>
                  </div>
                </div>
    `;
};

// sort the data
async function handleSortBtn() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  let realData = [...data.pets];

  realData.sort(function (a, b) {
    return b.price - a.price;
  });
  showThePetsToUI(realData);
}

// handleAdopt
const handleAdopt = (petId) => {
  countDown();
  setTimeout(() => {
    const id = document.getElementById(petId);
    id.classList.add("bg-btnColor", "bg-opacity-15");
    id.innerText = "Adopted";
    id.setAttribute("disabled", true);
  }, 4000);
};
// countDown
const countDown = () => {
  let count = 3;
  const countContent = document.getElementById("countContent");
  const closeBtn = document.getElementById("closeBtn");

  const countInterval = setInterval(() => {
    countContent.innerText = count;
    my_modal_3.showModal();
    count--;

    if (count < 0) {
      clearInterval(countInterval);
      closeBtn.click();
    }
  }, 1000);
};

// call the all function
fetchTheCategories();
fetchThePetsData();
