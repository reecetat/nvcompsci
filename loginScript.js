$(function(){
    $("#tosHeader").load('header.html')
    $("#tosFooter").load('footer.html')
  })
  $(function () {
    //switch form with buttons
    $("button#login-switch").click(function () { 
      $("div#login").show();
      $("div#signup").hide();
    });
    $("button#signup-switch").click(function () {
      $("div#login").hide();
      $("div#signup").show();
    });
  
    $("button#login-button").click(function () {
      //handle login form
      var email = $("input#email-login").val();
      var password = $("input#login-password").val();
  
      var login_data = { email: email, password: password, checkdata:false }; //make json for login
  
      $.ajax({ //send login data to server
        async: true,
        url: "login",
        type:"POST",
        data: login_data,
        success: function (res) {
          if(res == 'login successful'){
            window.location.href = "/index.html"
            localStorage.setItem("email",email);
            localStorage.setItem("password",password);
          }
          else if(res == 'login unsuccessful'){
            $("p#status").html("Check password and email and try again")
          }
          
        },
      });
    });
    $("button#signup-button").click(function () {
      // handle signup form
      var firstName = $("input#first-name").val();
      var lastName = $("input#last-name").val();
      var username = $("input#signup-email").val();
      var password = $("input#signup-password").val();
  
      var signup_data = { //make json for signup
        firstname: firstName,
        lastname: lastName,
        username: username,
        password: password,
      };
  console.log(signup_data)
      $.ajax({ //send signup data to server
        async: true,
        type: "POST",
        url: "login",
        data: signup_data,
        success: function (res) {
          if(res == "User registered"){
            $("p#status").html("User registered - please go and sign in!")
            console.log('User created')
            localStorage.setItem("email",email);
            localStorage.setItem("password",password);
            window.location.href = "/index.html"
          }
          else if(res == "user already exists"){
            $("p#status").html("User already registered - please try another email")
            console.log('User already existed')
          }
          else if(res =="illegal password"){
            $("p#status").html("Your password must have an upper case, a number and be at least 8 characters log")
            console.log("illegal password")
          }
        },
      });
    });
  });