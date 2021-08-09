export default function notify(vacationName:any, messageContent:any) {

    let message = document.getElementById("notifications")
    message.innerHTML= vacationName + messageContent;
    setTimeout(function(){ document.getElementById("notifications").innerHTML= "" }, 6000);
    message.style.color = "#00529B"
    message.style.fontWeight = "900"
    message.style.opacity = "1"
    message.style.transition = "opacity 0.3 ease-in-out"
    
    let messageDiv = document.getElementById("notifactionsDiv")
    messageDiv.style.opacity = "1"
    messageDiv.style.animation = "fadeIn ease 3s"
    setTimeout(function(){ messageDiv.style.animation = "fadeOut ease 3s" }, 3000);

}