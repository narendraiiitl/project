$(document).ready(function () {
function checkPasswordMatch() {
    var password = $("#txtNewPassword").val();
    var confirmPassword = $("#txtConfirmPassword").val();
    if (password != confirmPassword)
        $("#divCheckPasswordMatch").html("Passwords do not match!");
    else
        $("#divCheckPasswordMatch").html("Passwords match.");
}
$(document).ready(function () {
   $("#txtConfirmPassword").keyup(checkPasswordMatch);
});
});