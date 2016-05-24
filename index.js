
var casper = require('casper').create({
    pageSettings: {
        loadImages: true,//The script is much faster when this field is set to false 
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});

casper.options.viewportSize = { width: 320, height: 568 };

var fs = require('fs');
var fname = new Date().getTime() + '.txt';
var save = fs.pathJoin(fs.workingDirectory, 'lk', fname);
var xPath = require('casper').selectXPath;


//First step is to open lk.c300.me 
casper.start().thenOpen("https://lk.c300.me", function () {
    console.log("lk.c300.me website opened");
});



//Now we have to populate username and password, and submit the form 
casper.then(function () {
    console.log("Log in using username and password");

    this.evaluate(function () {
        document.getElementById("login_field").value = "miroshnikov.m@gmail.com";
        document.getElementById("password_field").value = "6f46a168";
        document.getElementById("loginForm").submit();


    });
});

//Wait to be redirected to the Home page, and then make a screenshot 
casper.then(function () {
    console.log("Make a screenshot and save it as AfterLogin.png");
    this.wait(2000, function() {
          this.capture('AfterLogin.png');
   });
   
   
    
 
});

// save  json 
//  casper.thenOpen('https://lk.c300.me/api/v2/reports/trial_balance/lk.json/?accounts=569f6648ee0e1e0001fe3140&area=569ec410a9a4cf00019fbfd4&date_from=2015-05-23T17:59:02&date_till=2016-05-23T17:59:02&sectors=rent', function () {
  //   console.log("save json");
 //   var htmlContent = this.getPageContent();
  //  var jsonContent = JSON.parse(htmlContent);
 //   console.log(jsonContent.meta.debt_total.rent);
    
 //   fs.write(save, this.getPageContent(), 'a'); //write json file to "lk" folder
    
// });

// save balanse screenshot

casper.thenOpen('https://lk.c300.me/cabinet/#/account', function () {
    this.echo('save balanse.png, page url is ' + this.getCurrentUrl());
    
    this.wait(1000, function() {
           
   });
   
   
});

//test xPath
// casper.then(function () {
    //this.echo("start xPath");
 //   if (casper.exists(xPath('//*[@id="tabContentView"]/div[1]/div[1]/div/form[3]/fieldset/div[1]/span/span[2]/span'))) {
//        this.echo("found");
//    } //end if 
 //   else { this.echo("no") }

    
// });


casper.then(function(){
    this.echo(this.getCurrentUrl());
    
         var debtValue = this.evaluate(function(){
             return __utils__.getElementByXPath('//*[@id="tabContentView"]/div[1]/div[1]/div/form[3]/fieldset/div[1]/span/span[2]/span').textContent;
           
    });
    
    this.echo("total debt = " + debtValue + " rub");
      
    fs.write("debt.txt", debtValue, function(err) {
        if(err) {
        return console.log(err);
        }
        }); 
  
     this.wait(5000, function() {
           this.capture('balance.png');
   });
   
}); //end casper.then


casper.run();