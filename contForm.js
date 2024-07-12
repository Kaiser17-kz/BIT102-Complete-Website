const form = document.querySelector('#contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function sendEmail() {
    const bodyMessage = `Name: ${nameInput.value}<br> Email: ${emailInput.value}<br> Message: ${messageInput.value}`;
    
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "dopaminehelpcenter@gmail.com",
        Password : "D416958F7C3111C55D9F99F9B1832073708C",
        To : 'dopaminehelpcenter@gmail.com',
        From : "dopaminehelpcenter@gmail.com",
        Subject: "Contact Form Message",
        Body : bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: `Message failed to send. Response: ${message}`,
                    icon: "error"
                });
            }
        }
    ).catch(error => {
        Swal.fire({
            title: "Error!",
            text: `Message failed to send: ${error}`,
            icon: "error"
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});
