// EmailJS Dual Email Handler (Owner + Customer Confirmation)
function sendMail() {
    function getVal(primaryId, altId) {
        var el = document.getElementById(primaryId) || (altId ? document.getElementById(altId) : null);
        return el ? el.value : "";
    }

    var nameVal = getVal("name", "contact-form-name");
    var emailVal = getVal("email", "contact-form-email");
    var phoneVal = getVal("phone", "contact-form-phone");
    var addressVal = getVal("address", "contact-form-address");
    var topicVal = getVal("topic", "contact-form-topic");
    var messageVal = getVal("message", "contact-form-message");

    if (!nameVal.trim() || !emailVal.trim() || !messageVal.trim()) {
        alert("Please fill in your Name, Email, and Message before submitting.");
        return;
    }

    var params = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal || "Not provided",
        address: addressVal || "Not provided",
        topic: topicVal || "General Inquiry",
        message: messageVal,
        time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    };

    var publicKey = "uwRyJrybdXCTtpoj2";
    var ownerTemplateId = "template_yanrde2";    // Studio inquiry notification
    var customerTemplateId = "template_9scpad6"; // Customer thank-you confirmation
    var serviceId = localStorage.getItem("emailjs_service_id") || "service_7cneare";

    if (typeof emailjs !== "undefined") {
        emailjs.init({ publicKey: publicKey });
        if (serviceId) {
            Promise.all([
                emailjs.send(serviceId, ownerTemplateId, params, publicKey),
                emailjs.send(serviceId, customerTemplateId, params, publicKey)
            ])
            .then(function(responses) {
                console.log("[EmailJS] Sent successfully:", responses);
            })
            .catch(function(err) {
                console.warn("[EmailJS] Send notice:", err);
            });
        }
    }

    alert("Thank you, " + nameVal + "! Your message has been received.");
    var form = document.getElementById("contact-form");
    if (form) form.reset();
}

if (typeof window !== "undefined") {
    window.sendMail = sendMail;
}
