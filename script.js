/* ========================================
   VEHICLE DATABASE
======================================== */

const vehicles = [

    {
        name: "Police Charger",
        id: "policecharger",
        type: "Car",
        job: "Police",
        image: "vehicles/vehicle01.png"
    },

    {
        name: "Police Explorer",
        id: "policeexplorer",
        type: "Car",
        job: "Police",
        image: "vehicles/vehicle02.png"
    },

    {
        name: "Police Bike",
        id: "policebike",
        type: "Motorcycle",
        job: "Police",
        image: "vehicles/vehicle03.png"
    },

    {
        name: "EMS Ambulance",
        id: "emsambulance",
        type: "Car",
        job: "EMS",
        image: "vehicles/vehicle04.png"
    },

    {
        name: "EMS SUV",
        id: "emssuv",
        type: "Car",
        job: "EMS",
        image: "vehicles/vehicle05.png"
    },

    {
        name: "Mechanic Tow Truck",
        id: "mechanictow",
        type: "Car",
        job: "Mechanic",
        image: "vehicles/vehicle06.png"
    },

    {
        name: "Civilian Sultan",
        id: "sultan",
        type: "Car",
        job: "Civilian",
        image: "vehicles/vehicle07.png"
    },

    {
        name: "Civilian Bike",
        id: "civilianbike",
        type: "Motorcycle",
        job: "Civilian",
        image: "vehicles/vehicle08.png"
    },

    {
        name: "Police Maverick",
        id: "polmav",
        type: "Helicopter",
        job: "Police",
        image: "vehicles/vehicle09.png"
    },

    {
        name: "Police Boat",
        id: "policeboat",
        type: "Boat",
        job: "Police",
        image: "vehicles/vehicle10.png"
    }

];


/* ========================================
   STATE
======================================== */

let currentType = "all";
let currentJob = "all";
let currentSearch = "";


/* ========================================
   ELEMENTS
======================================== */

const vehicleGrid =
    document.getElementById("vehicleGrid");

const vehicleCount =
    document.getElementById("vehicleCount");

const resultCount =
    document.getElementById("resultCount");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const noResults =
    document.getElementById("noResults");

const copyToast =
    document.getElementById("copyToast");

const copiedId =
    document.getElementById("copiedId");


/* ========================================
   INITIALIZE
======================================== */

vehicleCount.textContent =
    vehicles.length;


/* ========================================
   RENDER VEHICLES
======================================== */

function renderVehicles() {

    const filteredVehicles =
        vehicles.filter(vehicle => {

            const search =
                currentSearch.toLowerCase();

            const matchesSearch =
                vehicle.name
                    .toLowerCase()
                    .includes(search) ||

                vehicle.id
                    .toLowerCase()
                    .includes(search);

            const matchesType =
                currentType === "all" ||
                vehicle.type === currentType;

            const matchesJob =
                currentJob === "all" ||
                vehicle.job === currentJob;

            return (
                matchesSearch &&
                matchesType &&
                matchesJob
            );

        });


    vehicleGrid.innerHTML = "";


    filteredVehicles.forEach(vehicle => {

        const card =
            document.createElement("article");

        card.className = "vehicle-card";


        card.innerHTML = `

            <div class="vehicle-image">

                <img
                    src="${vehicle.image}"
                    alt="${vehicle.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/800x450/101111/d9ff00?text=NO+IMAGE'"
                >

                <div class="vehicle-tags">

                    <span class="tag">
                        ${vehicle.type.toUpperCase()}
                    </span>

                    <span class="tag job">
                        ${vehicle.job.toUpperCase()}
                    </span>

                </div>

            </div>


            <div class="vehicle-info">

                <h3 class="vehicle-name">
                    ${vehicle.name}
                </h3>

                <div class="vehicle-type">
                    ${getTypeName(vehicle.type)}
                </div>


                <div class="vehicle-id-area">

                    <span class="vehicle-id">
                        ${vehicle.id}
                    </span>

                    <button
                        class="copy-button"
                        onclick="copyCarId('${escapeAttribute(vehicle.id)}')"
                    >
                        COPY ID
                    </button>

                </div>

            </div>

        `;


        vehicleGrid.appendChild(card);

    });


    resultCount.textContent =
        filteredVehicles.length;


    if (filteredVehicles.length === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


/* ========================================
   VEHICLE TYPE NAME
======================================== */

function getTypeName(type) {

    const types = {

        Car: "Automobile",

        Motorcycle: "Motorcycle",

        Helicopter: "Helicopter",

        Boat: "Watercraft",

        Special: "Special Vehicle"

    };

    return types[type] || type;

}


/* ========================================
   ESCAPE
======================================== */

function escapeAttribute(value) {

    return value
        .replace(/'/g, "\\'")
        .replace(/"/g, "&quot;");

}


/* ========================================
   SEARCH
======================================== */

searchInput.addEventListener(
    "input",
    function () {

        currentSearch =
            this.value.trim();

        renderVehicles();

    }
);


/* ========================================
   CLEAR SEARCH
======================================== */

clearSearch.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        currentSearch = "";

        renderVehicles();

        searchInput.focus();

    }
);


/* ========================================
   TYPE FILTER
======================================== */

document
    .querySelectorAll("#typeFilters .filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        "#typeFilters .filter-button"
                    )
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                this.classList.add("active");

                currentType =
                    this.dataset.type;

                renderVehicles();

            }
        );

    });


/* ========================================
   JOB FILTER
======================================== */

document
    .querySelectorAll("#jobFilters .filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        "#jobFilters .filter-button"
                    )
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                this.classList.add("active");

                currentJob =
                    this.dataset.job;

                renderVehicles();

            }
        );

    });


/* ========================================
   COPY CAR ID
======================================== */

async function copyCarId(id) {

    try {

        await navigator.clipboard.writeText(id);

        showCopyToast(id);

    } catch (error) {

        /*
         * Clipboard APIが使えない環境用
         */

        const textarea =
            document.createElement("textarea");

        textarea.value = id;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();

        showCopyToast(id);

    }

}


/* ========================================
   COPY TOAST
======================================== */

let toastTimer;


function showCopyToast(id) {

    copiedId.textContent = id;

    copyToast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            copyToast.classList.remove("show");

        }, 2200);

}


/* ========================================
   START
======================================== */

renderVehicles();
