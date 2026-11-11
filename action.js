
/* ==========================================
   LANGUAGE TRANSLATIONS
========================================== */

const translations = {

    es: {
        languageLabel: "Idioma:",
        subtitle: "Calcula tu impacto ambiental y descubre tus Eco-Points.",
        formTitle: "Calculadora de impacto ambiental",

        nameLabel: "Nombre del usuario (opcional)",
        namePlaceholder: "Ingresa tu nombre",

        transportLabel: "Medio de transporte",
        transportPlaceholder: "Selecciona una opción",
        bus: "Bus",
        private: "Carro privado",
        shared: "Carro compartido",
        green: "Bicicleta/Caminando",

        paperLabel: "Hojas de papel utilizadas diariamente",
        paperPlaceholder: "Ej. 5",

        recyclingLabel: "Nivel de reciclaje",
        low: "Bajo",
        medium: "Medio",
        high: "Alto",

        calculateButton: "Calcular impacto ambiental",

        carbonTitle: "Huella de carbono semanal",
        pointsTitle: "Eco-Points obtenidos",

        printButton: "Imprimir / Guardar Reporte PDF",

        validation: "Por favor, completa todos los campos correctamente.",

        certificateTitle: "Certificado Ecológico",
        certificateSubtitle: "Bolívar Eco-Calculator",

        certificateRecipient: "Este certificado se otorga a:",
        defaultName: "Miembro de la comunidad Bolívar",

        certificateDescription:
            "En reconocimiento a tu participación en Bolívar Eco-Calculator y tu compromiso con el cuidado del medio ambiente.",

        certificateCarbonTitle: "HUELLA DE CARBONO SEMANAL",
        certificatePointsTitle: "ECO-POINTS",

        certificateMessage:
            "¡Cada acción positiva hace la diferencia! Gracias por contribuir a construir un futuro más sostenible.",

        certificateFooter: "Bolívar Eco-Calculator | Colegio Bolívar",

        certificateFooterSubtitle:
            "Promoviendo la sostenibilidad, una acción a la vez."
    },

    en: {
        languageLabel: "Language:",
        subtitle: "Calculate your environmental impact and discover your Eco-Points.",
        formTitle: "Environmental Impact Calculator",

        nameLabel: "User name (optional)",
        namePlaceholder: "Enter your name",

        transportLabel: "Means of transportation",
        transportPlaceholder: "Select an option",
        bus: "Bus",
        private: "Private car",
        shared: "Carpool",
        green: "Bicycle/Walking",

        paperLabel: "Paper sheets used daily",
        paperPlaceholder: "E.g. 5",

        recyclingLabel: "Recycling level",
        low: "Low",
        medium: "Medium",
        high: "High",

        calculateButton: "Calculate environmental impact",

        carbonTitle: "Weekly Carbon Footprint",
        pointsTitle: "Eco-Points Earned",

        printButton: "Print / Save PDF Report",

        validation: "Please complete all fields correctly.",

        certificateTitle: "Eco Certificate",
        certificateSubtitle: "Bolívar Eco-Calculator",

        certificateRecipient: "This certificate is presented to:",
        defaultName: "Bolívar Community Member",

        certificateDescription:
            "In recognition of your participation in the Bolívar Eco-Calculator and your commitment to environmental care.",

        certificateCarbonTitle: "WEEKLY CARBON FOOTPRINT",
        certificatePointsTitle: "ECO-POINTS",

        certificateMessage:
            "Every positive action makes a difference! Thank you for helping build a more sustainable future.",

        certificateFooter: "Bolívar Eco-Calculator | Colegio Bolívar",

        certificateFooterSubtitle:
            "Promoting sustainability, one action at a time."
    }

};


/* ==========================================
   LANGUAGE SELECTOR
========================================== */

const languageSelector = document.getElementById("language");

let currentLanguage = "es";

function changeLanguage(language) {

    currentLanguage = language;

    const t = translations[language];

    document.documentElement.lang = language;

    document.getElementById("languageLabel").textContent = t.languageLabel;
    document.getElementById("subtitle").textContent = t.subtitle;
    document.getElementById("formTitle").textContent = t.formTitle;

    document.getElementById("nameLabel").textContent = t.nameLabel;
    document.getElementById("name").placeholder = t.namePlaceholder;

    document.getElementById("transportLabel").textContent = t.transportLabel;
    document.getElementById("paperLabel").textContent = t.paperLabel;
    document.getElementById("paper").placeholder = t.paperPlaceholder;
    document.getElementById("recyclingLabel").textContent = t.recyclingLabel;

    // Transport options
    const transport = document.getElementById("transport");

    transport.options[0].textContent = t.transportPlaceholder;
    transport.options[1].textContent = t.bus;
    transport.options[2].textContent = t.private;
    transport.options[3].textContent = t.shared;
    transport.options[4].textContent = t.green;

    // Recycling options
    const recycling = document.getElementById("recycling");

    recycling.options[0].textContent = t.transportPlaceholder;
    recycling.options[1].textContent = t.low;
    recycling.options[2].textContent = t.medium;
    recycling.options[3].textContent = t.high;

    document.getElementById("calculateButton").textContent = t.calculateButton;

    document.getElementById("carbonTitle").textContent = t.carbonTitle;
    document.getElementById("pointsTitle").textContent = t.pointsTitle;

    document.getElementById("printButton").textContent = t.printButton;

    // Certificate translations
    document.getElementById("certificateTitle").textContent = t.certificateTitle;
    document.getElementById("certificateSubtitle").textContent = t.certificateSubtitle;
    document.getElementById("certificateRecipient").textContent = t.certificateRecipient;
    document.getElementById("certificateDescription").textContent = t.certificateDescription;

    document.getElementById("certificateCarbonTitle").textContent = t.certificateCarbonTitle;
    document.getElementById("certificatePointsTitle").textContent = t.certificatePointsTitle;

    document.getElementById("certificateMessage").textContent = t.certificateMessage;
    document.getElementById("certificateFooter").textContent = t.certificateFooter;
    document.getElementById("certificateFooterSubtitle").textContent = t.certificateFooterSubtitle;

    // Update certificate name
    const userName = document.getElementById("name").value.trim();

    document.getElementById("certificateName").textContent =
        userName || t.defaultName;

    // Update existing results if available
    if (!document.getElementById("results").hidden) {
        const carbon = document.getElementById("carbonResult").textContent;
        const points = document.getElementById("pointsResult").textContent;

        updateCertificate(carbon, points);
    }
}

languageSelector.addEventListener("change", function() {
    changeLanguage(this.value);
});


/* ==========================================
   CALCULATOR FUNCTIONALITY
========================================== */

const form = document.getElementById("ecoForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const transport = document.getElementById("transport").value;
    const paperInput = document.getElementById("paper").value;
    const paper = Number(paperInput);
    const recycling = document.getElementById("recycling").value;

    // Validate inputs
    if (
        transport === "" ||
        paperInput === "" ||
        recycling === "" ||
        paper < 0 ||
        !Number.isInteger(paper)
    ) {

        alert(translations[currentLanguage].validation);
        return;

    }

    // Weekly carbon footprint factors
    const transportFactors = {
        bus: 4,
        private: 15,
        shared: 8,
        green: 0
    };

    // Weekly paper consumption
    const weeklyPaper = paper * 5;

    // Carbon emissions calculation
    const transportCO2 = transportFactors[transport] * 5;
    const paperCO2 = weeklyPaper * 0.005;

    const carbonFootprint = transportCO2 + paperCO2;

    // Recycling points
    const recyclingPoints = {
        low: 5,
        medium: 15,
        high: 25
    };

    // Transport points
    const transportPoints = {
        bus: 20,
        private: 5,
        shared: 15,
        green: 30
    };

    // Paper points
    const paperPoints = Math.max(0, 20 - weeklyPaper);

    // Total Eco-Points
    const ecoPoints =
        transportPoints[transport] +
        paperPoints +
        recyclingPoints[recycling];

    // Display results
    const carbonText = carbonFootprint.toFixed(2) + " kg CO₂";

    const pointsText = ecoPoints +
        (currentLanguage === "es" ? " puntos" : " points");

    document.getElementById("carbonResult").textContent = carbonText;

    document.getElementById("pointsResult").textContent = pointsText;

    document.getElementById("results").hidden = false;

    // Update certificate
    updateCertificate(carbonText, pointsText);

});


/* ==========================================
   CERTIFICATE GENERATION
========================================== */

function updateCertificate(carbon, points) {

    const t = translations[currentLanguage];

    const userName = document.getElementById("name").value.trim();

    document.getElementById("certificateName").textContent =
        userName || t.defaultName;

    document.getElementById("certificateCarbon").textContent = carbon;

    document.getElementById("certificatePoints").textContent = points;

}


/* ==========================================
   PRINT / SAVE PDF
========================================== */

function printReport() {

    if (document.getElementById("results").hidden) {
        return;
    }

    window.print();

}

document.getElementById("printButton").addEventListener("click", printReport);


/* ==========================================
   INITIAL LANGUAGE
========================================== */

changeLanguage("es");
